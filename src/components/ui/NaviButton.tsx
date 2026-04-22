"use client";
import { useLenis } from "lenis/react";
import { useCallback } from "react";
import type { MouseEvent } from "react";

export default function NaviButton({
    targetId = "",
    className = "",
    children,
}: {
    targetId?: string;
    className?: string;
    children?: React.ReactNode;
}) {
    const lenis = useLenis(); // lenis 훅을 사용하여 Lenis 인스턴스를 안전하게 가져옴(렌더링 시점에 따라 null일 수 있으므로)

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

    return (
        <button onClick={(e) => handleScrollToSection(e, targetId)} className={`shrink-0 ${className}`}>
            {children}
        </button>
    );
}
