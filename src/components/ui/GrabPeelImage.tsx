'use client';
import { useRef, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
 
// 복귀 시: 탄성 오버슈트 -> elastic 느낌 (낮은 damping)
const RETURN_STIFFNESS = 0.16;
const RETURN_DAMPING   = 0.38;

// 뒷 장 scale 스프링 느낌: 바운스 등장/퇴장
const SCALE_STIFFNESS  = 0.20;
const SCALE_DAMPING    = 0.40;

type Mode = 'idle' | 'dragging' | 'returning';

interface State {
    x: number; y: number; vx: number; vy: number;
    scale: number; vscale: number;
    mode: Mode;
    dragStartX: number; dragStartY: number;
}

export default function GrabPeelImage({
    frontSrc,
    backSrc,
    frontAlt = '',
    backAlt  = '',
    maxOffsetX = 300,
    maxOffsetY = 150,
    className,
}: {
    frontSrc:    StaticImageData | string;
    backSrc:     StaticImageData | string;
    frontAlt?:   string;
    backAlt?:    string;
    maxOffsetX?: number;
    maxOffsetY?: number;
    className?:  string;
}) {
    const frontRef  = useRef<HTMLDivElement>(null);
    const backRef   = useRef<HTMLDivElement>(null);
    const rafRef    = useRef<number | null>(null);

    // stale closure 방지 -> prop 변경을 ref로 동기화
    const maxOffsetXRef = useRef(maxOffsetX);
    const maxOffsetYRef = useRef(maxOffsetY);
    maxOffsetXRef.current = maxOffsetX;
    maxOffsetYRef.current = maxOffsetY;

    const state = useRef<State>({
        x: 0, y: 0, vx: 0, vy: 0,
        scale: 0, vscale: 0,
        mode: 'idle',
        dragStartX: 0, dragStartY: 0,
    });

    // DOM에 transform 직접 적용 (리렌더 없음)
    const flush = useCallback(() => {
        const s = state.current;
        if (frontRef.current) {
            frontRef.current.style.transform =
                `translate(${s.x.toFixed(3)}px, ${s.y.toFixed(3)}px)`;
        }
        if (backRef.current) {
            backRef.current.style.transform =
                `scale(${Math.max(0, s.scale).toFixed(4)})`;
        }
    }, []);

    const tick = useCallback(() => {
        const s = state.current;

        if (s.mode === 'dragging') {
            // 앞 장은 pointerMove에서 직접 갱신. 여기선 뒷 장 scale 애니메이션만
            s.vscale += (1 - s.scale) * SCALE_STIFFNESS;
            s.vscale *= SCALE_DAMPING;
            s.scale  += s.vscale;
            flush();

            const done =
                Math.abs(s.vscale) < 0.001 &&
                Math.abs(1 - s.scale) < 0.001;
            rafRef.current = done ? null : requestAnimationFrame(tick);
            return;
        }

        if (s.mode === 'returning') {
            // 앞 장 -> 원점 스프링 (elastic overshoot)
            s.vx += (0 - s.x) * RETURN_STIFFNESS;
            s.vy += (0 - s.y) * RETURN_STIFFNESS;
            s.vx *= RETURN_DAMPING;
            s.vy *= RETURN_DAMPING;
            s.x  += s.vx;
            s.y  += s.vy;

            // 뒷 장 -> scale 0 스프링
            s.vscale += (0 - s.scale) * SCALE_STIFFNESS;
            s.vscale *= SCALE_DAMPING;
            s.scale  += s.vscale;

            flush();

            const done =
                Math.abs(s.vx) < 0.01 && Math.abs(s.vy) < 0.01 &&
                Math.abs(s.x)  < 0.01 && Math.abs(s.y)  < 0.01 &&
                Math.abs(s.vscale) < 0.001 && Math.abs(s.scale) < 0.001;

            if (done) {
                s.x = 0; s.y = 0; s.vx = 0; s.vy = 0;
                s.scale = 0; s.vscale = 0;
                s.mode = 'idle';
                flush();
                rafRef.current = null;
            } else {
                rafRef.current = requestAnimationFrame(tick);
            }
        }
    }, [flush]);

    const startLoop = useCallback(() => {
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(tick);
        }
    }, [tick]);

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        const s = state.current;
        s.mode = 'dragging';
        // 현재 위치 기준에서 드래그 시작 (이미 리턴 중이면 부드럽게 이어짐)
        s.dragStartX = e.clientX - s.x;
        s.dragStartY = e.clientY - s.y;
        s.vx = 0; s.vy = 0;
        startLoop();
    }, [startLoop]);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const s = state.current;
        if (s.mode !== 'dragging') return;

        const rawX = e.clientX - s.dragStartX;
        const rawY = e.clientY - s.dragStartY;
        s.x = Math.max(-maxOffsetXRef.current, Math.min(maxOffsetXRef.current, rawX));
        s.y = Math.max(-maxOffsetYRef.current, Math.min(maxOffsetYRef.current, rawY));

        flush();
    }, [flush]);

    const handlePointerUp = useCallback(() => {
        const s = state.current;
        if (s.mode !== 'dragging') return;
        s.mode = 'returning';
        // 복귀 시작 속도는 0 (elastic 스프링이 오버슈트를 만들어줌)
        s.vx = 0; s.vy = 0;
        startLoop();
    }, [startLoop]);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, []);

    return (
        <div className={`relative select-none group ${className ?? ''}`}>
            {/* 뒷 장: 처음엔 scale(0), grab 시 bounce로 등장 */}
            <div
                ref={backRef}
                className="absolute inset-0 w-full h-full origin-center"
                style={{ willChange: 'transform', transform: 'scale(0)' }}
            >
                <Image
                    src={backSrc}
                    alt={backAlt}
                    fill
                    sizes="(min-width: 1920px) 20vw, 256px"
                    className="object-cover pointer-events-none"
                />
            </div>

            {/* 앞 장: grab으로 당김 */}
            <div
                ref={frontRef}
                className="relative w-full h-full group-hover:outline-3 group-hover:outline-dashed group-hover:outline-offset-5 hover:outline-app-fg/70 cursor-grab active:cursor-grabbing"
                style={{ willChange: 'transform', touchAction: 'none' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <Image
                    src={frontSrc}
                    alt={frontAlt}
                    fill
                    sizes="(min-width: 1920px) 20vw, 256px"
                    className="object-cover pointer-events-none"
                />
            </div>
        </div>
    );
}
