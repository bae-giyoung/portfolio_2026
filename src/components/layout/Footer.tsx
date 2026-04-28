
"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import SlideUpText from "../ui/text/SlideUpText";
import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";

const EMAIL = "giyoung_work@naver.com";

const strengths = [
    { name: "성실함", reveal: "Sincere" },
    { name: "소통", reveal: "Listen" },
    { name: "함께 고민", reveal: "Together" },
    { name: "작은 디테일", reveal: "Care" },
    { name: "계속 성장", reveal: "Growing" },
];

export default function Footer() {
    const toast = useToast();
    const [isEmailHovered, setIsEmailHovered] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    const handleRefresh = useCallback(async () => {
        // 1. Refresh 버튼 slide-up 재생 (force-hover 토글)
        const footer = footerRef.current;
        if (footer) {
            footer.classList.add("force-hover");
            setTimeout(() => footer.classList.remove("force-hover"), 1500);
        }
    }, [footerRef]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 350, damping: 28 });
    const springY = useSpring(mouseY, { stiffness: 350, damping: 28 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleEmailCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            toast.success("이메일이 복사되었습니다!");
        } catch {
            toast.error("복사에 실패했습니다.");
        }
    };

    return (
        <div id="footer-wrap" className="relative w-full h-full py-10 bg-app-fg/2 border-t border-app-fg/20 dark:border-app-fg/50 font-inst">
            {/* Copy 커서 버블 */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 bg-white border border-app-fg/20 text-black text-sm md:text-lg font-semibold px-5 py-2.5 rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-70%",
                }}
                animate={{ scale: isEmailHovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                Copy Email
            </motion.div>

            <footer 
                ref={footerRef}
                className="relative w-full px-5 md:px-7.5 lg:px-18 3xl:max-w-480 3xl:mx-auto"
            >
                {/* 문구 + 이메일 버튼 */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-8 lg:py-16">
                    {/* 헤드라인 */}
                    <p className="flex-1 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-app-fg mb-2 md:mb-0">
                        <SlideUpText subText="With Care" subClassName="justify-start!">
                            사용자와 팀 모두에게
                        </SlideUpText>
                        <br />좋은 경험을 만드는
                        <br />개발자가 되고 싶습니다.
                    </p>

                    {/* 이메일 버튼 컨테이너 */}
                    <div
                        className="shrink-0 w-full md:w-[38%] md:min-w-97 h-20 md:min-h-28 border border-app-fg/40 dark:border-app-fg/50 rounded-2xl overflow-hidden"
                        onMouseEnter={() => setIsEmailHovered(true)}
                        onMouseLeave={() => setIsEmailHovered(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <button
                            type="button"
                            onClick={handleEmailCopy}
                            className="relative w-full h-full flex items-center justify-center group overflow-hidden hover:bg-app-fg/5 transition-colors duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                        >
                            <SlideUpText
                                subText="I'd love to hear from you💕"
                                subClassName="text-app-fg text-xl lg:text-2xl 2xl:text-3xl font-semibold"
                                className="w-full h-full text-3xl lg:text-4xl font-semibold text-app-fg"
                            >
                                <span className="inline-block mr-4">
                                    <Image src={asterisk} alt="" width={26} height={26} className="animate-[spin_5s_linear_infinite]" />
                                </span>
                                <span>Email</span>
                            </SlideUpText>
                        </button>
                    </div>
                </div>

                {/* strengths 필 */}
                <div className="flex flex-wrap items-center gap-3 pt-0 pb-5 md:pt-10 md:pb-10 border-b border-app-fg/20 dark:border-app-fg/50">
                    {strengths.map((link) => (
                        <div
                            key={link.name}
                            className={`relative w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.5rem)] lg:flex-1 border border-app-fg/40 dark:border-app-fg/50 hover:border-app-fg rounded-full px-8 py-2 text-sm font-medium transition-colors duration-300 group`}
                        >
                            <SlideUpText
                                subText={link.reveal}
                                subClassName="text-app-fg text-sm font-medium"
                                className="w-full h-full py-2 text-sm font-medium text-app-fg"
                            >
                                {link.name}
                            </SlideUpText>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleRefresh}
                        className={`relative w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.5rem)] lg:flex-1 px-8 py-3 border border-app-fg/40 dark:border-app-fg/50 hover:border-app-primary rounded-full outline-4 outline-transparent hover:outline-app-primary/20 text-sm font-medium transition-colors duration-300 group motion-safe:animate-soft-ring`}
                    >
                        <SlideUpText
                            subText="Click"
                            subClassName="text-app-fg text-lg font-medium"
                            className="w-full h-full text-sm font-medium text-app-fg"
                        >
                            Refresh
                        </SlideUpText>
                    </button>
                </div>

                {/* 카피라이트 */}
                <div className="flex items-center py-6 lg:py-10">
                    <p className="text-sm text-app-fg/50">© 2026 Bae Gi Young. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}