"use client";

import { useRef, useState, useMemo, memo } from "react";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";

/** x 값을 [-totalWidth, 0) 범위로 유지 */
function wrap(val: number, tW: number): number {
    if (tW === 0) return 0;
    let v = val % tW;
    if (v >= 0) v -= tW;
    return v;
}

/** 드래그로 간주할 최소 이동 거리 (px) */
const DRAG_THRESHOLD = 5;

// == 타입
export type DraggableMarqueeItem = {
    src: StaticImageData | string;
    alt: string;
    width: number;
    height: number;
    label?: string;
    link?: string;
    linkLabel?: string;
};

type Props = {
    items: DraggableMarqueeItem[];
    /** 속도 (기본 50) */
    velocity?: number;
    /** 카드 간 간격 (기본 10) */
    gap?: number;
    className?: string;
};

// == 갤러리 카드: 여기서만 사용할 것이므로 분리하지 않음 
const GalleryCard = memo(function GalleryCard({
    item,
    isDragging,
    hasDraggedRef,
}: {
    item: DraggableMarqueeItem;
    isDragging: boolean;
    hasDraggedRef: React.RefObject<boolean>;
}) {
    const [hovered, setHovered] = useState(false);
    const showOverlay = hovered && !isDragging;

    return (
        <div
            className="relative flex-none rounded-[10px] shadow-lg group overflow-hidden"
            style={{ width: item.width, height: item.height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* 이미지 */}
            <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={`${item.width}px`}
                className="object-cover pointer-events-none"
                draggable={false}
            />

            {/* Hover 오버레이 */}
            {item.label && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-[10px] px-5 bg-white/85 transition-opacity duration-300"
                    style={{ opacity: showOverlay ? 1 : 0 }}
                >
                    <p className="text-black/85 text-xl font-bold text-center leading-relaxed tracking-wide">
                        {item.label}
                    </p>

                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label="Hide"
                            className="mt-3 px-6 py-4 bg-black/70 rounded-4xl text-white text-[16px] font-medium hover:bg-black transition-colors duration-300 cursor-pointer"
                            onClick={(e) => {
                                if (hasDraggedRef.current) e.preventDefault();
                            }}
                        >
                            {item.linkLabel ?? "사이트 보기"}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
});


// == 메인 갤러리 컴포넌트
export default function DraggableMarqueeGallery({
    items,
    velocity = 50,
    gap = 10,
    className,
}: Props) {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // totalWidth: 모든 아이템의 너비 합 + 아이템 수만큼의 간격 (copy-1의 마지막 아이템과 copy-2의 첫 아이템 사이 간격 포함!)
    const totalWidth = items.reduce((sum, item) => sum + item.width, 0) + gap * items.length;

    // == 드래그 상태 
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const hasDraggedRef = useRef(false); // 실제 이동이 있었는지 (클릭과 드래그 구분)
    const pointerStartXRef = useRef(0);
    const xOnStartRef = useRef(0);
    const lastPointerXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const capturedPointerIdRef = useRef<number | null>(null);
    /** 드래그 해제 시 속도: px/sec 단위 (양수 = 오른쪽 방향) */
    const momentumRef = useRef(0);

    // velocity는 프롭이지만, 드래그 모멘텀 계산을 위해 최신값이 필요하므로 ref로 관리
    const velocityRef = useRef(velocity);
    velocityRef.current = velocity;
    const totalWidthRef = useRef(totalWidth);
    totalWidthRef.current = totalWidth;

    // == 애니메이션 프레임: 자동 스크롤 + 드래그 후 모멘텀
    useAnimationFrame((_, delta) => {
        if (isDraggingRef.current) return;

        const dt = delta / 1000; // seconds
        const tW = totalWidthRef.current;
        if (tW <= 0) return;

        // 모멘텀 감쇠 (시간 기반: 0.5초 후 약 3% 남음)
        momentumRef.current *= Math.pow(0.001, dt / 0.5);

        const effectiveVelocity = -velocityRef.current + momentumRef.current;
        x.set(wrap(x.get() + effectiveVelocity * dt, tW));
    });

    // == 포인터 이벤트 핸들러
    const onPointerDown = (e: React.PointerEvent) => {
        isDraggingRef.current = true;
        hasDraggedRef.current = false;
        pointerStartXRef.current = e.clientX;
        xOnStartRef.current = x.get();
        lastPointerXRef.current = e.clientX;
        lastTimeRef.current = performance.now();
        capturedPointerIdRef.current = null;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;

        const delta = e.clientX - pointerStartXRef.current;

        // 임계값 초과 시 실제 드래그로 전환하고 포인터 캡처
        if (!hasDraggedRef.current && Math.abs(delta) > DRAG_THRESHOLD) {
            hasDraggedRef.current = true;
            setIsDragging(true);
            capturedPointerIdRef.current = e.pointerId;
            containerRef.current?.setPointerCapture(e.pointerId);
            containerRef.current?.setAttribute('data-cursor-label', '···');
        }

        if (!hasDraggedRef.current) return;

        x.set(wrap(xOnStartRef.current + delta, totalWidthRef.current));

        // 드래그 후 모멘텀을 위한 순간 속도 추적
        const now = performance.now();
        const dt = now - lastTimeRef.current;
        if (dt > 0) {
            momentumRef.current = ((e.clientX - lastPointerXRef.current) / dt) * 1000;
        }
        lastPointerXRef.current = e.clientX;
        lastTimeRef.current = now;
    };

    const onPointerUp = () => {
        if (!isDraggingRef.current) return;
        if (capturedPointerIdRef.current !== null) {
            containerRef.current?.releasePointerCapture(capturedPointerIdRef.current);
            capturedPointerIdRef.current = null;
        }
        isDraggingRef.current = false;
        setIsDragging(false);
        containerRef.current?.setAttribute('data-cursor-label', 'Drag');
    };


    // == 렌더링
    const doubled = useMemo(() => [...items, ...items], [items]);

    return (
        <div
            ref={containerRef}
            className={`w-full select-none cursor-none ${className}`}
            style={{ overflow: "clip" }}
            data-cursor-label="Drag"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <motion.div
                className="flex items-end"
                style={{ x, gap: `${gap}px` }}
            >
                {doubled.map((item, i) => (
                    <GalleryCard key={i} item={item} isDragging={isDragging} hasDraggedRef={hasDraggedRef} />
                ))}
            </motion.div>
        </div>
    );
}
