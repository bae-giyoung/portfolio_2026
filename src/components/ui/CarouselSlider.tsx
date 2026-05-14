'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_INTERVAL_MS = 4_000;

export type CarouselSlide = {
    src: StaticImageData | string;
    alt: string;
    title: string;
};

type CarouselSliderProps = {
    slides: CarouselSlide[];
    /** 슬라이드 자동 전환 간격 (ms) */
    interval?: number;
    className?: string;
};

export default function CarouselSlider({
    slides,
    interval = DEFAULT_INTERVAL_MS,
    className = "",
}: CarouselSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused]       = useState(false);

    // 이전 인덱스 추적 -> 제목 exit 애니메이션용
    const prevIndexRef = useRef(activeIndex);
    useEffect(() => {
        if (prevIndexRef.current !== activeIndex) {
            prevIndexRef.current = activeIndex;
        }
    }, [activeIndex, slides]);

    const isReducedMotion =
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;

    const goNext = useCallback(() => {
        setActiveIndex(prev => (prev + 1) % slides.length);
    }, [slides.length]);

    const goPrev = useCallback(() => {
        setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    return (
        <div className={className} role="region" aria-label="Image carousel">
            {/* 카드  */}
            <div
                className="relative w-full aspect-3/4 rounded-[10px] overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
            >
                {/* 상단 프로그레스 바 */}
                <div className="absolute top-3 left-3 right-3 z-1 flex gap-1.5" aria-hidden>
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                        >
                            {i < activeIndex ? (
                                // 완료된 슬라이드: 꽉 찬 상태
                                <div className="h-full w-full bg-white" />
                            ) : i === activeIndex ? (
                                // 현재 슬라이드: 채워지는 애니메이션
                                // key 변경 -> 리마운트 -> 애니메이션 재시작
                                <div
                                    key={`progress-${activeIndex}`}
                                    className="h-full bg-white origin-left"
                                    style={{
                                        animation: isReducedMotion
                                            ? undefined
                                            : `carousel-progress ${interval}ms linear forwards`,
                                        animationPlayState: isPaused ? "paused" : "running",
                                        // 모션 감소 시 즉시 채움
                                        width: isReducedMotion ? "100%" : undefined,
                                    }}
                                    // animationEnd -> 다음 슬라이드로 이동 (타이머 드리프트 없음)
                                    onAnimationEnd={goNext}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>

                {/* 슬라이드 이미지 (fadeIn / fadeOut) */}
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        data-active={i === activeIndex || undefined}
                        aria-hidden={i !== activeIndex}
                        className={[
                            "absolute inset-0 transition-opacity duration-800",
                            i === activeIndex ? "opacity-100 is-active" : "opacity-0",
                        ].join(" ")}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            sizes="(min-width: 1536px) 480px, (min-width: 1024px) 320px, 100vw"
                            className="object-cover pointer-events-none"
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>

            {/* 카드 하단: 제목 + 네비게이션  */}
            <div className="flex justify-between items-center mt-2 lg:mt-6">
                {/* 제목 */}
                <div className="relative overflow-y-hidden">
                    {/* 입장 제목: 아래에서 위로 fadeIn */}
                    <p
                        key={`enter-${activeIndex}`}
                        className="font-extrabold text-xl xl:text-2xl whitespace-nowrap"
                        style={{
                            animation: isReducedMotion
                                ? undefined
                                : "carousel-title-in 0.6s cubic-bezier(0.0, 0.0, 0.2, 1) 0.1s both",
                        }}
                    >
                        {slides[activeIndex].title}
                    </p>
                </div>

                {/* 이전/다음 버튼 */}
                <div className="flex gap-2">
                    <button
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="w-10 h-10 rounded-full border border-app-fg flex items-center justify-center hover:bg-app-fg hover:text-app-bg transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Next slide"
                        className="w-10 h-10 rounded-full border border-app-fg flex items-center justify-center hover:bg-app-fg hover:text-app-bg transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
