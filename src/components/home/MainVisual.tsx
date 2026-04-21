'use client';
import Image from "next/image";
import NameModalButton from "../ui/NameModalButton";
import profileImg from "@/assets/profile_00.webp";
import TypingText from "../ui/TypingText";
import LiveDualClock from "../ui/LiveDualClock";

export default function MainVisual({
    mainRef,
    headingRef,
    mainContentsRef
} : {
    mainRef: React.RefObject<HTMLElement | null>;
    headingRef: React.RefObject<HTMLHeadingElement | null>;
    mainContentsRef: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <main ref={mainRef} id="main" className="relative flex flex-col items-center justify-center gap-10 w-full h-screen min-h-150 font-inst overflow-hidden">

            {/* 폴라로이드 사진 */}
            <div
                id="polaroid"
                className="relative w-64"
            >
                {/* Portfolio 타이포 */}
                <p className="font-hurricane text-[200px] text-app-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-wider">Portfolio</p>

                {/* 포트폴리오 사진 */}
                <div className="my-picture relative w-full h-full z-0">
                    <div
                        className={`w-full h-full
                            bg-white px-6 pt-7.5 pb-12
                            dark:bg-transparent dark:border-none dark:shadow-none
                            shadow-2xl hover:rotate-6 transition-transform duration-300 ease-bounce`}
                    >
                        <div className={`
                            absolute -left-[5%] bottom-0 w-70 h-15  
                            bg-app-primary opacity-0 invisible dark:opacity-100 dark:visible rotate-0 z-1
                        `}>
                        </div>
                        <div className="image-container relative w-full h-full aspect-5/4">
                            <Image
                                src={profileImg}
                                alt="프로필 사진"
                                fill
                                className="image object-cover pointer-events-none"
                            />
                        </div>
                        <div className="my-text relative mt-3 text-black z-10">
                            <TypingText
                                className="font-medium text-[14px]"
                                text={["협업 능력이 뛰어난 개발자", "문제를 해결하는 것을 즐기는 개발자", "끊임없이 성장하는 개발자"]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor
                                cursorCharacter="_"
                                deletingSpeed={50}
                                cursorBlinkDuration={0.5}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* I am 배기영 */}
            <h2 ref={headingRef} className="relative px-5 md:px-7.5 text-4xl md:text-6xl font-medium tracking-tight text-app-fg text-left md:text-center leading-snug">
                {/* <span className="block font-space animate-pulse text-app-primary text-9xl">*</span> */}
                <span className="inline-block mr-6">Hello,</span>
                <br className="block md:hidden" />
                <span className="inline-block mr-2 font-serif">I</span>
                <span className="inline-block mr-6 font-serif italic">am</span>
                <NameModalButton />
                <span className="inline-block mr-2 w-7.5 in-[.is-loading]:w-0 transition-all duration-700 overflow-hidden leading-none">_</span>
                <span className="inline-block font-space animate-pulse text-app-primary">*</span>
            </h2>

            {/* I am ready to work! */}
            <div ref={mainContentsRef} className="flex items-center absolute left-5 sm:left-7.5 md:left-18 bottom-0 pb-5">
                {/* <span className="inline-block text-9xl font-hurricane mr-4">*</span> */}
                <span className="relative mr-4 flex w-3 h-3 items-center justify-center">
                    <span className="absolute w-full h-full rounded-full border border-app-primary/70 animate-ripple-wave"></span>
                    <span className="absolute w-full h-full rounded-full border border-app-primary/55 animate-ripple-wave [animation-delay:0.45s]"></span>
                    <span className="absolute w-full h-full rounded-full border border-app-primary/40 animate-ripple-wave [animation-delay:0.9s]"></span>
                    <b className="relative block w-3 h-3 rounded-full bg-app-primary"></b>
                </span>
                <span className="relative block text-sm sm:text-xl">
                    Ready to Work
                </span>
            </div>

            {/* 현재 시각: UTC / 서울 */}
            <div className="absolute hidden sm:block right-5 sm:right-7.5 md:right-18 bottom-0 pb-5">
                <LiveDualClock className="inline-block text-sm" />
            </div>

        </main>
    );
}