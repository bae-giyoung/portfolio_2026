'use client';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

export default function Template({children} : {children: React.ReactNode}) {
    const pathname = usePathname();
    const lenis = useLenis();

    const handleExitComplete = () => {
        // Lenis Smooth Scroll Provider에서 
        // stopInertiaOnNavigate: true로 설정했으므로,
        // 페이지 전환 시 Lenis의 관성이 멈추지만, 즉시 스크롤이 0으로 이동하도록 추가로 처리함!
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        <AnimatePresence mode="wait" initial={true} onExitComplete={handleExitComplete}>
            <motion.div
                key={pathname}
                initial={{opacity:0, transition: {duration: .6}}}
                animate={{opacity:1, transition: {duration: .6}}}
                exit={{opacity:0, transition: {duration: .3}}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}