'use client';

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type SectionTitleProps = {
    children: string;
    as?: HeadingTag;
    className?: string;
};

export default function SectionTitle({
    children,
    as: Tag = "h2",
    className = "text-[40px] sm:text-[60px] md:text-[80px] xl:text-9xl font-bold text-app-fg leading-[1.2] overflow-hidden",
}: SectionTitleProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const el = containerRef.current;
        if (!el) return;

        // 접근성: 모션 감소 설정 시 애니메이션 생략
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const split = new SplitText(el, { type: "words, lines" });

        // 초기 상태: 아래에서 숨겨진 채로 시작
        gsap.set(split.lines, { y: "110%", opacity: 0 });

        let reverted = false;
        const safeRevert = () => {
            if (!reverted) {
                reverted = true;
                split.revert();
            }
        };

        // 뷰포트 진입 시에만 애니메이션 실행 (성능 최적화)
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.disconnect();
                    gsap.to(split.lines, {
                        y: "0%",
                        opacity: 1,
                        duration: 0.75,
                        stagger: 0.025,
                        ease: "power2.out",
                        // GPU 힌트 해제 + split DOM 복원
                        onComplete: safeRevert,
                    });
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            safeRevert();
        };
    }, { scope: containerRef });

    // 모든 헤딩 태그는 HTMLHeadingElement를 공유하므로 안전한 타입 단언
    const HeadingTag = Tag as React.ElementType;

    return (
        <HeadingTag 
            ref={containerRef} 
            className={className}
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textRendering: "optimizeLegibility" }} // 타이포그래피 최적화
        >
            {children}
        </HeadingTag>
    );
}
