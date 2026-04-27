"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const SCROLL_AFTER_NAV_KEY = "portfolioScrollAfterNav";

/**
 * 다른 페이지에서 홈('/')으로 이동 후 특정 섹션으로 Lenis scrollTo 처리하는 함수!
 *
 * 사용처: 홈 page.tsx
 */
export function useScrollAfterNav() {
    const lenis = useLenis();
    const executedRef = useRef(false);

    useEffect(() => {
        if (!lenis) return;
        if (executedRef.current) return;

        const targetId = sessionStorage.getItem(SCROLL_AFTER_NAV_KEY);
        if (!targetId) return;

        executedRef.current = true;
        sessionStorage.removeItem(SCROLL_AFTER_NAV_KEY);

        const el = document.getElementById(targetId);
        if (!el) return;

        setTimeout(() => {
            lenis.scrollTo(el, { offset: -30, immediate: true });
        }, 250);
    }, [lenis]);
}
