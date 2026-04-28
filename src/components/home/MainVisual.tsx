'use client';
import LiveDualClock from "../ui/LiveDualClock";
import ToolTipText from "../ui/text/ToolTipText";
import MagneticWrapper from "../ui/MagneticWrapper";
import Polaroid from "../ui/Polaroid";

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
        <main ref={mainRef} id="main" className="relative flex flex-col items-center justify-center gap-10 w-full h-screen min-h-150 max-h-270 3xl:min-h-225 font-inst overflow-hidden">

            {/* 폴라로이드 사진 */}
            <div
                id="polaroid-wrapper"
                className="relative w-64 3xl:w-[min(16vw,24rem)] 3xl:max-w-none aspect-square"
                >
                {/* Portfolio 타이포 */}
                <p className="font-hurricane text-[200px] 3xl:text-[min(12vw,20rem)] text-app-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-wider">Portfolio</p>

                <MagneticWrapper offsetScale={{x: 80, y: 30}} boundingScale={{x: 4, y: 2}} className="relative w-full h-full z-1">
                    <Polaroid />
                </MagneticWrapper>
            </div>

            {/* I am 배기영 */}
            <h2 ref={headingRef} className="relative px-5 md:px-7.5 text-4xl md:text-6xl font-medium tracking-tight text-app-fg text-left md:text-center leading-snug">
                <span className="3xl:text-[min(4vw,7rem)]">
                    {/* <span className="block font-space animate-pulse text-app-primary text-9xl">*</span> */}
                    <span className="inline-block mr-6">Hello,</span>
                    <br className="block md:hidden" />
                    <span className="inline-block mr-2 font-serif">I</span>
                    <span className="inline-block mr-6 font-serif italic">am</span>
                    <ToolTipText text="배기영" tooltipText="Curious about me?" />
                    <span className="inline-block mr-2 w-7.5 in-[.is-loading]:w-0 transition-all duration-700 overflow-hidden leading-none">_</span>
                    <span className="inline-block font-space animate-pulse text-app-primary">*</span>
                </span>
            </h2>

            {/* I am ready to work! */}
            <div ref={mainContentsRef} className="flex items-center absolute left-5 sm:left-7.5 md:left-18 bottom-0 pb-5 text-app-fg/70">
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
            <div className="absolute hidden sm:block right-5 sm:right-7.5 md:right-18 bottom-0 pb-5 text-app-fg/70">
                <LiveDualClock className="inline-block text-sm" />
            </div>

        </main>
    );
}