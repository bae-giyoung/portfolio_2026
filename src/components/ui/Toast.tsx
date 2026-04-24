'use client';

import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { toastListAtom, removeToastAtom, type ToastItem } from "@/atoms/atoms";
import asterik from "@/assets/icons/asterik.svg";
import Image from "next/image";

// 타입별 아이콘 & 색상
const TOAST_CONFIG: Record<
    ToastItem['type'],
    { icon?: string; bar: string; bg: string; border: string }
> = {
    success: {
        icon: "✓",
        bar: "bg-emerald-500",
        bg: "bg-app-bg/70 dark:bg-app-bg/70",
        border: "border-emerald-400/60 dark:border-emerald-500/40",
    },
    error: {
        icon: "✕",
        bar: "bg-red-500",
        bg: "bg-app-bg/70 dark:bg-app-bg/70",
        border: "border-red-400/60 dark:border-red-500/40",
    },
    warning: {
        icon: "!",
        bar: "bg-amber-400",
        bg: "bg-app-bg/70 dark:bg-app-bg/70",
        border: "border-amber-400/60 dark:border-amber-500/40",
    },
    info: {
        bar: "bg-transparent",
        bg: "bg-app-bg/70 dark:bg-app-bg/70",
        border: "border-app-primary/60 dark:border-app-primary/40",
    },
};

function ToastItem({ toast }: { toast: ToastItem }) {
    const removeToast = useSetAtom(removeToastAtom);
    const config = TOAST_CONFIG[toast.type];

    useEffect(() => {
        const timer = setTimeout(() => removeToast(toast.id), toast.duration);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, removeToast]);

    return (
        <motion.li
            layout
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.8 }}
            className={`
                relative flex items-center gap-3 min-w-64 max-w-xs
                rounded-2xl border px-4 py-3
                shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                backdrop-blur-md cursor-pointer select-none
                ${config.bg} ${config.border}
            `}
            onClick={() => removeToast(toast.id)}
            role="alert"
            aria-live="assertive"
        >
            {/* 좌측 컬러 바 */}
            <span className={`absolute left-0 top-3 bottom-3 w-0.75 rounded-full ${config.bar}`} />

            {/* 아이콘 */}
            <span
                className={`
                    shrink-0 flex items-center justify-center
                    w-6 h-6 rounded-full text-xs font-bold text-white
                    ${config.bar}
                `}
            >
                {config.icon ? config.icon : <Image src={asterik} alt="아이콘" width={18} height={18} className="animate-spin" />}
            </span>

            {/* 메세지 */}
            <p className="text-sm font-medium text-app-fg leading-snug flex-1">
                {toast.message}
            </p>

            {/* 진행 바 */}
            <motion.span
                className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl origin-left ${config.bar} opacity-40`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: toast.duration / 1000, ease: "linear" }}
            />
        </motion.li>
    );
}

export default function Toast() {
    const [mounted, setMounted] = useState(false);
    const toasts = useAtomValue(toastListAtom);
    
    // SSR 방지 및 클라이언트에서만 렌더링
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toastRoot = document.getElementById("toast-root");
    if (!toastRoot) return null;

    return createPortal(
        <ul
            className="fixed bottom-6 right-6 z-200 flex flex-col gap-2 items-end pointer-events-none"
            aria-label="알림"
        >
            <AnimatePresence initial={false} mode="sync">
                {toasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} />
                    </div>
                ))}
            </AnimatePresence>
        </ul>,
        toastRoot
    );
}
