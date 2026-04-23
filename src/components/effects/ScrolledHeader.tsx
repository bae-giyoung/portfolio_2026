'use client';

import { useEffect } from "react";

export default function ScrolledHeader() {

    const handleScroll = (header: HTMLElement | null) => {
        const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (header) {
            header.classList.toggle("scrolled", scrollY > 200);
        }
    };

    useEffect(() => {
        const header = document.getElementById("header-wrap");

        const onScroll = () => handleScroll(header);

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return null;
}