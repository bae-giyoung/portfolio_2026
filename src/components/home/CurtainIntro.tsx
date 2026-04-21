"use client";

import { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * SVG path를 곡선 형태로 업데이트하는 유틸.
 * objectBoundingBox(0~1) 좌표계 사용 -> 리사이즈에 자동 대응.
 *
 * @param path   - SVGPathElement
 * @param edgeY  - 커튼 하단 엣지 위치 (1 = 화면 맨 아래, 0 = 맨 위)
 * @param bend   - 곡선 깊이 (양수 = 아래로 볼록)
 * @param anchor - "top" 이면 상단 고정+하단 커브, "bottom"이면 하단 고정+상단 커브
 */
function setCurvePath(
    path: SVGPathElement,
    edgeY: number,
    bend: number,
    anchor: "top" | "bottom" = "top"
) {
    const controlY = edgeY + bend;
    const d =
        anchor === "top"
        ? // 상단(0,0)~(1,0) 고정, 하단이 곡선으로 열림
        `M 0 0 L 1 0 L 1 ${edgeY} Q 0.5 ${controlY} 0 ${edgeY} Z`
        : // 하단(0,1)~(1,1) 고정, 상단이 곡선으로 열림
        `M 0 1 L 1 1 L 1 ${edgeY} Q 0.5 ${controlY} 0 ${edgeY} Z`;
    path.setAttribute("d", d);
}

export default function CurtainIntro({
    headerRef,
    mainRef,
    headingRef,
    mainContentsRef,
} : {
    headerRef: React.RefObject<HTMLDivElement | null>;
    mainRef: React.RefObject<HTMLElement | null>;
    headingRef: React.RefObject<HTMLHeadingElement | null>;
    mainContentsRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    /** 콘텐츠 등장 -> 커튼 곡선 와이프 아웃 */
    const buildTimeline = useCallback(() => {
        const root = document.documentElement;
        const path = pathRef.current;
        const content = contentRef.current;
        const overlay = overlayRef.current;
        if (!path || !content || !overlay) return;

        // 애니메이션 시작 시 스크롤 잠금
        root.classList.add("is-loading");

        if (tlRef.current) tlRef.current.kill(); // 기존 타임라인이 있으면 제거

        tlRef.current = gsap.timeline({
            onComplete() {
                // 애니메이션 완료 후 스크롤 허용
                root.classList.remove("is-loading");
                // will-change 힌트 제거 (GPU 메모리 반환)
                overlay.style.willChange = "auto";
                // GSAP이 남긴 인라인 transform 제거 (fixed 포지셔닝 containing block 방지)
                //if (headerRef.current) gsap.set(headerRef.current, { clearProps: "transform" });
                if (mainRef.current) gsap.set(mainRef.current, { clearProps: "transform" });
                //if (headingRef.current) gsap.set(headingRef.current, { clearProps: "transform" });
                if (mainContentsRef.current) gsap.set(mainContentsRef.current, { clearProps: "transform" });
                // 애니메이션 완료 상태로 업데이트하여 컴포넌트 언마운트 트리거
                setIsAnimationComplete(true);
            }
        });

        /* == Phase 1: 콘텐츠 페이드인 */
        tlRef.current.fromTo(
            content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );

        /* == Phase 2: 곡선 커튼 와이프 (아래->위) */
        const curve = { val: 1 }; // 1 = 맨 아래(전체 덮음), 0 = 맨 위(완전 열림)
        tlRef.current.to(curve, {
            val: 0,
            delay: 0.6,
            duration: 1.4,
            ease: "power4.inOut",
            onUpdate() {
                const bend = Math.sin(Math.PI * curve.val) * 0.35;
                setCurvePath(path, curve.val, bend, "top");
            },
        }, "curtainWipe");

        /* 콘텐츠도 같이 사라짐 */
        tlRef.current.to(
            content,
            { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" },
            "curtainWipe+=0.6"
        );

        /* == Phase 3: 곡선 커튼 와이프 중간에 app 콘텐츠 애니메이션 시작 */
        if (headerRef.current) {
            tlRef.current.fromTo(
                headerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, ease: "power2.out" },
                "curtainWipe+=1.6"
            );
        }
        
        if (mainRef.current) {
            tlRef.current.fromTo(
                mainRef.current,
                { yPercent: 10 },
                { yPercent: 0, duration: 0.8, ease: "power2.out" },
                "curtainWipe+=1.2"
            );
        }

        /* if (headingRef.current) {
            tlRef.current.fromTo(
                headingRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 0.6, ease: "power2.out" },
                "curtainWipe+=1.2"
            );
        } */

        if (mainContentsRef.current) {
            tlRef.current.fromTo(
                mainContentsRef.current,
                { xPercent: 10 },
                { xPercent: 0, duration: 1.2, ease: "power2.out" },
                "curtainWipe+=1.4"
            );
        }

        /* == Phase 4: 오버레이 안보이게 */
        tlRef.current.set(overlay, { visibility: "hidden" });
    }, [headerRef, mainRef, headingRef, mainContentsRef]);

    useGSAP(
        () => {
            // 초기 상태: 커튼이 화면 전체를 덮음
            pathRef.current?.setAttribute("d", "M 0 0 L 1 0 L 1 1 Q 0.5 1 0 1 Z");
            buildTimeline();
        },
        { scope: containerRef }
    );

    /* == Final: 애니메이션 완료 후 컴포넌트 언마운트 */
    if (isAnimationComplete) return null;

    return (
        <div ref={containerRef} className="fixed w-full h-screen inset-0 z-50">
            {/* 곡선 커튼 오버레이 */}
            <div
                ref={overlayRef}
                className="relative w-full h-full"
                style={{ willChange: "clip-path", clipPath: "url(#curtain-curve)" }}
            >
                {/* SVG clipPath 정의 — objectBoundingBox로 0~1 비율, 리사이즈 안전 */}
                <svg
                    className="absolute"
                    width="0"
                    height="0"
                    aria-hidden="true"
                >
                    <defs>
                        <clipPath id="curtain-curve" clipPathUnits="objectBoundingBox">
                            <path ref={pathRef} d="M 0 0 L 1 0 L 1 1 Q 0.5 1 0 1 Z" />
                        </clipPath>
                    </defs>
                </svg>

                {/* 커튼 배경 + 콘텐츠 */}
                <div className="absolute inset-0 bg-app-fg flex flex-col items-center justify-center">
                    <div
                        ref={contentRef}
                        className="flex flex-col items-center gap-4 opacity-0"
                    >
                        <h2 className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-app-bg text-center leading-snug align-middle">
                            <span className="absolute left-[50%] -top-[1em] -translate-x-[50%] block font-space text-[2.8em] animate-bounce">*</span>
                            안녕하세요!
                            <br />
                            믿을 수 있는 동료가 되고 싶은
                            <br />
                            프론트엔드 개발자, 배기영입니다.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
