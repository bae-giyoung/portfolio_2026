"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { floatingCursorLabelAtom } from "@/atoms/atoms";

export default function FloatingLabelCursor() {
    const [label, setLabel] = useAtom(floatingCursorLabelAtom);

    const cursorRawX = useMotionValue(-200);
    const cursorRawY = useMotionValue(-200);
    const cursorX = useSpring(cursorRawX, { stiffness: 600, damping: 35, mass: 0.4 });
    const cursorY = useSpring(cursorRawY, { stiffness: 600, damping: 35, mass: 0.4 });

    const lastPos = useRef({ x: -200, y: -200 });

    useEffect(() => {
        const updateLabel = (x: number, y: number) => {
            const el = document.elementFromPoint(x, y);
            const zone = el?.closest("[data-cursor-label]");
            setLabel(zone?.getAttribute("data-cursor-label") ?? null);
        };

        const onMouseMove = (e: MouseEvent) => {
            cursorRawX.set(e.clientX);
            cursorRawY.set(e.clientY);
            lastPos.current = { x: e.clientX, y: e.clientY };
            updateLabel(e.clientX, e.clientY);
        };

        const onScroll = () => updateLabel(lastPos.current.x, lastPos.current.y);

        const onMouseLeave = () => setLabel(null);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("scroll", onScroll, { passive: true, capture: true });

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("scroll", onScroll, { capture: true });
        };
    }, [cursorRawX, cursorRawY, setLabel]);

    return (
        <motion.div
            className="pointer-events-none fixed z-9999 flex items-center justify-center bg-white border border-app-fg/20 text-black text-sm md:text-lg font-semibold px-5 py-2.5 rounded-full shadow-sm"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                opacity: label?.toLowerCase() === "hide" ? 0 : label ? 1 : 0,
                scale: label ? 1 : 0.7,
            }}
            transition={{
                opacity: { duration: 0.18 },
                scale: { duration: 0.18 },
            }}
        >
            {label ?? ""}
        </motion.div>
    );
}
