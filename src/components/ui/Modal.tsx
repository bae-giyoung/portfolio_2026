'use client';

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { closeModalAtom, modalStateAtom } from "@/atoms/atoms";

export default function Modal() {
    const modalState = useAtomValue(modalStateAtom);
    const closeModal = useSetAtom(closeModalAtom);

    useEffect(() => {
        if (!modalState.isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal, modalState.isOpen]);

    if (typeof document === "undefined") return null;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
        <AnimatePresence>
            {modalState.isOpen ? (
                <div
                    className="fixed inset-0 z-120 flex items-end justify-center px-3 py-3 sm:items-center sm:px-6 sm:py-6"
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        aria-label="모달 닫기"
                        className="absolute inset-0 backdrop-blur-xs cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => closeModal()}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 72, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 32, scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                            mass: 0.95,
                        }}
                        className={`
                            relative z-10 flex h-[min(760px,92vh)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] 
                            border border-app-fg bg-app-bg shadow-[0_32px_100px_rgba(15,23,42,0.38)] 
                            backdrop-blur-xl 
                            dark:border-white/10 dark:bg-zinc-950/90
                        `}
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-black/8 bg-gradient-to-b from-white/95 to-zinc-200/85 px-4 py-3 dark:border-white/8 dark:from-zinc-900/95 dark:to-zinc-950/90">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => closeModal()}
                                    aria-label="닫기"
                                    className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] border-2 border-app-fg shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)] transition-transform duration-200 hover:scale-110 cursor-pointer"
                                />
                                <span className="h-3.5 w-3.5 rounded-full border-2 border-app-fg shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]" />
                                <span className="h-3.5 w-3.5 rounded-full border-2 border-app-fg shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="mx-auto flex max-w-md items-center justify-center rounded-full border border-black/8 bg-white/80 px-4 py-1.5 text-center text-sm font-medium text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/8 dark:bg-white/6 dark:text-zinc-200">
                                    <span className="truncate">
                                        {modalState.header ?? "about://bae-giyoung"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.85),_rgba(244,244,245,0.96))] dark:bg-[radial-gradient(circle_at_top,_rgba(63,63,70,0.35),_transparent_38%),linear-gradient(180deg,_rgba(24,24,27,0.96),_rgba(9,9,11,0.98))]">
                            <div className="h-full min-h-0 overflow-hidden p-3 sm:p-5">
                                <div className="h-full min-h-0 overflow-y-auto p-3 rounded-[22px] border border-black/6 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-sm dark:border-white/8 dark:bg-zinc-900/78">
                                    {modalState.content}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>,
        modalRoot
    );
}
