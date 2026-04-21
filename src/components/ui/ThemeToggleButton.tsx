'use client';

import { useTheme } from "../providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Star } from "lucide-react";

export default function ThemeToggleButton({
    className
}: {
    className?: string;
}) {
    const { theme, mounted, toggleTheme } = useTheme();
    const isDark = mounted && theme === "dark";

    return (
        <div className="relative inline-block">
            {/* Floating Box */}
            <AnimatePresence>
                {isDark && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 25,
                            duration: 0.3
                        }}
                        className={`
                            absolute transform mr-2 px-3 py-1 bg-app-fg text-app-bg text-sm font-noto rounded-lg shadow-lg whitespace-nowrap
                            left-[50%] top-full -translate-x-[50%] translate-y-4 animate-pulse
                            sm:-left-2 sm:top-[50%] sm:-translate-y-[50%] sm:-translate-x-full sm:animate-none
                            lg:left-[50%] lg:top-full lg:translate-y-4 lg:-translate-x-[50%] lg:animate-none
                        `}
                    >
                        라이트 모드로 봐주세요
                        <div className={`
                            absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-app-fg 
                            sm:left-full sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:border-l-4 sm:border-l-app-fg sm:border-t-2 
                            sm:border-t-transparent sm:border-b-2 sm:border-b-transparent
                            lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-full lg:border-x-4 lg:border-x-transparent lg:border-b-4 lg:border-b-app-fg
                        `}></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleTheme}
                className={`
                    relative flex items-center w-16 h-7 px-1 py-2 rounded-full transition-all duration-500 
                    border-current/70 cursor-pointer outline-none border-2
                    ${className}
                `}
                aria-label="테마 설정"
            >

                {/* 동그라미 */}
                <motion.div
                    layout
                    initial={false}
                    animate={{
                        x: isDark ? 0 : 34 // 다시
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30
                    }}
                    className="relative z-10 flex items-center justify-center w-5 h-5 bg-white border rounded-full shadow-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.div
                                key="moon"
                                initial={{y: 40, opacity: 0, rotate: -45}}
                                animate={{y: 0, opacity: 1, rotate: 0}}
                                exit={{y: -40, opacity: 0, rotate: 45}}
                                transition={{duration: 0.3}}
                                className="relative"
                            >
                                <Moon className="w-4 h-4 text-black fill-current" />
                                <motion.div
                                    animate={{scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5]}}
                                    transition={{repeat: Infinity, duration: 2}}
                                    className="absolute -top-0.5 -right-0.5"
                                >
                                    <Star className="w-2 h-2 text-black fill-current" />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="moon"
                                initial={{y: 40, opacity: 0, rotate: -45}}
                                animate={{y: 0, opacity: 1, rotate: 0}}
                                exit={{y: -40, opacity: 0, rotate: 45}}
                                transition={{duration: 0.3}}
                                className="relative"
                            >
                                <Sun className="w-4 h-4 text-black" strokeWidth={2.75} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </button>
        </div>
    );
}