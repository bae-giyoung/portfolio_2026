"use client";


/** 일단은 임시로      */
import {
    useEffect,
    useRef,
    useCallback,
    createContext,
    useContext,
    type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { getRouteLabel } from "@/datas/menuConfig";

/**
 * Context - 페이지 이동을 가로채 트랜지션 후 navigate 하도록 navigate 함수 제공
 * transitionIn - 커튼이 올라와 화면을 덮음
 * transitionOut - 커튼이 내려가 화면에서 제거됨
 * navigate - transitionIn -> route push -> transitionOut 순으로 실행
 * pathname 변경 감지 - 새 페이지 렌더 완료 시점 감지하여 transitionOut 실행
 */
type NavigateFn = (href: string) => void;

const PageTransitionContext = createContext<NavigateFn | null>(null);

/** 트랜지션 인식 router.push 대체 훅 */
export function usePageTransition(): NavigateFn {
    const ctx = useContext(PageTransitionContext);
    if (!ctx) throw new Error("usePageTransition must be used inside PageTransitionProvider");
    return ctx;
}

/**
 * DOM 구조 참고자료: 
 * .pt-container (fixed)
 *   .pt-screen (position:relative, will-change:top)
 *     .pt-curve-top (absolute, bottom pill)
 *     .pt-curve-bottom (absolute, top pill)
 *     .pt-label (absolute center, 페이지 이름)
 */
interface Props {
    children: ReactNode;
}

export default function PageTransition({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();

    const containerRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const curveTopRef = useRef<HTMLDivElement>(null);
    const curveBotRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLHeadingElement>(null);

    // 진행 중 여부: navigate 중복 방지
    const isAnimatingRef = useRef(false);

    /* DOM 초기 상태 세팅 */
    useEffect(() => {
        if (!screenRef.current || !curveTopRef.current || !curveBotRef.current || !labelRef.current) return;
        gsap.set(screenRef.current, { top: "100%" });
        gsap.set(curveTopRef.current, { height: "0vh" });
        gsap.set(curveBotRef.current, { height: "10vh" });
        gsap.set(labelRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    }, []);

    /* 트랜지션 IN: 커튼을 올려 화면을 덮음 */
    const transitionIn = useCallback(
        (label: string): Promise<void> => {
            return new Promise((resolve) => {
                if (!screenRef.current || !curveTopRef.current || !curveBotRef.current || !labelRef.current) {
                    resolve();
                    return;
                }

                if (labelRef.current) {
                    labelRef.current.innerHTML = `
                        <span class="absolute left-1/2 -top-[1em] -translate-x-1/2 block font-space text-[2em] animate-bounce">*</span>
                        <span>${label}</span>
                    `;
                }

                const tl = gsap.timeline({
                    onComplete: () => {
                        // 화면이 완전히 덮힌 후 상단으로 스크롤 이동
                        lenis?.scrollTo(0, { immediate: true });
                        resolve();
                    },
                });

                // 커튼 올라옴
                tl.set(screenRef.current, { top: "100%" });
                tl.set(curveTopRef.current, { height: "0vh" });
                tl.set(curveBotRef.current, { height: "10vh" });
                tl.set(labelRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });

                tl.to(screenRef.current, {
                    top: "0%",
                    duration: 0.5,
                    ease: "power4.in",
                });
                tl.to(
                    curveTopRef.current,
                    { height: "10vh", duration: 0.4, ease: "power4.in" },
                    "<+0",
                );
                tl.to(labelRef.current, {
                    opacity: 1,
                    yPercent: -60,
                    duration: 0.6,
                    ease: "power4.out",
                    delay: 0.05,
                });
            });
        },
        [lenis],
    );

    /* 트랜지션 OUT: 커튼을 올려 화면에서 제거 */
    const transitionOut = useCallback((): Promise<void> => {
        return new Promise((resolve) => {
            if (!screenRef.current || !curveTopRef.current || !curveBotRef.current || !labelRef.current) {
                resolve();
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    // 커튼 대기 위치로 복구
                    gsap.set(screenRef.current!, { top: "100%" });
                    gsap.set(curveTopRef.current!, { height: "0vh" });
                    gsap.set(curveBotRef.current!, { height: "10vh" });
                    gsap.set(labelRef.current!, { opacity: 0, xPercent: -50, yPercent: -50 });
                    isAnimatingRef.current = false;
                    resolve();
                },
            });

            tl.set(curveTopRef.current, { height: "0vh" });

            tl.to(screenRef.current, {
                top: "-100%",
                duration: 0.8,
                ease: "power3.inOut",
            });
            tl.to(
                labelRef.current,
                { opacity: 0, duration: 0.5, ease: "linear" },
                "<",
            );
            tl.to(
                curveBotRef.current,
                { height: "0vh", duration: 0.85, ease: "power3.inOut" },
                "<+0.1",
            );
        });
    }, []);

    /* navigate: 트랜지션 in -> route push -> 트랜지션 out */
    const navigate = useCallback(
        (href: string) => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;

            const label = getRouteLabel(href);

            transitionIn(label).then(() => {
                router.push(href);
            });
        },
        [router, transitionIn],
    );

    /* pathname 변경 = 새 페이지 렌더 완료 -> 커튼 내려감 */
    const prevPathnameRef = useRef(pathname);
    useEffect(() => {
        if (prevPathnameRef.current === pathname) return;
        prevPathnameRef.current = pathname;

        // 트랜지션 in 이 없었던 경우(첫 로드, 뒤로앞으로 등)는 스킵
        if (!isAnimatingRef.current) return;

        transitionOut();
    }, [pathname, transitionOut]);

    return (
        <PageTransitionContext.Provider value={navigate}>
            {children}

            {/* 커튼 오버레이 */}
            <div
                aria-hidden="true"
                role="presentation"
                className="pt-container"
            >
                <div ref={screenRef} className="pt-screen">
                    {/* 상단 곡선 */}
                    <div ref={curveTopRef} className="pt-curve-top">
                        <div className="pt-curve-inner" />
                    </div>

                    {/* 텍스트 레이블 */}
                    <h2 ref={labelRef} className="pt-label" />

                    {/* 하단 곡선 */}
                    <div ref={curveBotRef} className="pt-curve-bottom">
                        <div className="pt-curve-inner" />
                    </div>
                </div>
            </div>
        </PageTransitionContext.Provider>
    );
}
