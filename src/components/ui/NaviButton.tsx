"use client";
import { usePathname } from "next/navigation";
import useBackToHome from "@/hooks/useBackToHome";
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
    const pathname = usePathname();
    const handleBackToHome = useBackToHome();

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

    if(pathname !== "/") {
        const cleanTargetId = targetId.startsWith("#") ? targetId.slice(1) : targetId;
        return (
            <button onClick={() => handleBackToHome(cleanTargetId)} className={`shrink-0 ${className}`}>
                {children}
            </button>
        );
    }

    return (
        <button onClick={(e) => handleScrollToSection(e, targetId)} className={`shrink-0 ${className}`}>
            {children}
        </button>
    );
}
