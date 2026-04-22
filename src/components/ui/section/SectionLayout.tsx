"use client";

import { useEffect, useRef } from "react";
import SectionMeta from "./SectionMeta";
import SectionTitle from "./SectionTitle";

type SectionLayoutProps = {
    sectionId: string;
    sectionMeta?: {
        number: string;
        category: string;
        label: string;
    };
    sectionTitle?: string;
    children: React.ReactNode;
};

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
};

const sectionStyle = "relative w-full flex flex-col gap-10 sm:gap-10 xl:gap-20 mt-20 pt-4 xl:pt-8 pb-10 xl:pb-20 border-t border-app-fg font-inst break-keep";

export default function SectionLayout({
    sectionId,
    sectionMeta,
    sectionTitle,
    children,
} : SectionLayoutProps
) {

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        // 접근성: 모션 감소 설정 시 애니메이션 생략
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            sectionEl.style.opacity = "1";
            return;
        }

        // IntersectionObserver 지원 여부 확인
        if (!("IntersectionObserver" in window)) {
            sectionEl.style.opacity = "1";
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.opacity = "1";
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        observer.observe(sectionEl);

        return () => {
            if (sectionEl) observer.unobserve(sectionEl);
        };

    }, []);

    return (
        <section 
            id={sectionId} 
            ref={sectionRef} 
            className={sectionStyle}
            style={{opacity: 0, transition: "opacity 0.8s ease-out"}}
        >
            {/* 섹션 메타 */}
            {sectionMeta && <SectionMeta {...sectionMeta} />}
            {/* 섹션 타이틀 */}
            {sectionTitle && <SectionTitle>{sectionTitle}</SectionTitle>}
            {children}
        </section>
    );
}