"use client";
import { usePathname } from "next/navigation";
import useBackToHome from "@/hooks/useBackToHome";
import { usePageTransition } from "./PageTransition";
import { useLenis } from "lenis/react";
import { useCallback } from "react";
import type { MouseEvent } from "react";

export default function NaviButton({
    href,
    className = "",
    children,
}: {
    href: string;
    className?: string;
    children?: React.ReactNode;
}) {
    const pathname = usePathname();
    const handleBackToHome = useBackToHome();
    const navigate = usePageTransition();

    const lenis = useLenis(); // lenis 훅을 사용하여 Lenis 인스턴스를 안전하게 가져옴(렌더링 시점에 따라 null일 수 있으므로)

    /* 메인 페이지 내 섹션으로 스크롤 이동 */
    const handleScrollToSection = useCallback((e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        const cleanId = id.startsWith("#") ? id : `#${id}`;
        const el = document.querySelector(cleanId) as HTMLElement | null;
        if (lenis && el) {
            lenis.scrollTo(el, { offset: -50, immediate: false });
        } else if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }, [lenis]);

    /* == [메인 섹션으로의 이동 버튼] */
    if (href.startsWith("#")) {
        /* 메인 페이지에서 */
        if (pathname === "/") {
            return (
                <button onClick={(e) => handleScrollToSection(e, href)} className={`shrink-0 ${className}`}>
                    {children}
                </button>
            );
        }
    
        /* 서브 페이지에서 */
        return (
            <button onClick={() => handleBackToHome(href)} className={`shrink-0 ${className}`}>
                {children}
            </button>
        );
    }

    /* == [서브 페이지 버튼]: 현재 페이지 경로와 상관 없이 동일한 렌더링 */
    return (
        <button onClick={() => navigate(href)} className={`shrink-0 ${className}`}>
            {children}
        </button>
    );
}
