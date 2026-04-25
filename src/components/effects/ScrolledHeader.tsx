'use client';

import { useEffect } from "react";

export default function ScrolledHeader() {

    const handleScroll = (header: HTMLElement | null) => {
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (header) {
            header.classList.toggle("scrolled", scrollY > 60);
        }
    };

    useEffect(() => {
        const header = document.getElementById("header-wrap");

        const onScroll = () => handleScroll(header);

        handleScroll(header); // 초기 상태 설정
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return null;
}