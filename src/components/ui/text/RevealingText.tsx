'use client';

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type RevealingTextProps = {
    children: React.ReactNode | string;
    className?: string;
};

export default function RevealingText({
    children,
    className,
}: RevealingTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const splitRef = useRef<SplitText | null>(null);

    const clearGSAP = () => {
        tlRef.current?.kill();
        tlRef.current = null;

        splitRef.current?.revert();
        splitRef.current = null;
    };

    useGSAP(() => {
        const el = containerRef.current;
        if (!el) return;

        // 접근성: 모션 감소 설정 시 애니메이션 생략
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // 기존 타임라인 있으면 제거
        clearGSAP();

        splitRef.current = new SplitText(el, { type: "chars, words" });

        // 초기 상태: 아래에서 숨겨진 채로 시작
        gsap.set(splitRef.current.chars, { opacity: 0.3 });

        tlRef.current = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: el,
                start: "top+=30% bottom",
                end: "top 10%",
                markers: true,
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });

        tlRef.current.to(splitRef.current.chars, {
            opacity: 1,
            stagger: 0.05,
        });

        return () => {
            clearGSAP();
        };
    }, {
        scope: containerRef,
        dependencies: []
    });

    return (
        <div 
            ref={containerRef} 
            className={className}
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textRendering: "optimizeLegibility" }} // 타이포그래피 최적화
        >
            {children}
        </div>
    );
}
