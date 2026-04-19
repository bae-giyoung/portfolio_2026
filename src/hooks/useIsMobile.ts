import { useState, useEffect } from "react";

export function useIsMobile(
    breakpoint: number = 1024
) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR 환경 대응

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        }

        checkIsMobile(); // 초기값 설정

        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [breakpoint]);

    return isMobile;
}