
"use client";

import { useLenis } from "lenis/react";
import {useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_PRIVATE_PLAY_URL ?? "";

const tabs = [
	{
		id: "gallery",
		label: "Gallery",
		src: `${BASE}/lab01`,
        desc: "갤러리 형태의 인터랙티브 프로젝트 탐색 UI 실험입니다.",
	},
    {
		id: "hero",
		label: "Profile Hero",
		src: `${BASE}/lab02`,
        desc: "개인 프로필을 활용한 인터랙티브 히어로 섹션 실험입니다.",
	},
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function LabPage() {
    const lenis = useLenis();
    const tabButtonsRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);
	const [loadedTabs, setLoadedTabs] = useState<Set<TabId>>(
		new Set([tabs[0].id])
	);

	const handleTabChange = (tabId: TabId) => {
        if (!tabButtonsRef.current) return;
        
        // 스크롤 먼저
        if (lenis && tabButtonsRef.current) {
            lenis.scrollTo(tabButtonsRef.current, { offset: -120, immediate: false });
        } else if (tabButtonsRef.current) {
            tabButtonsRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // 탭 변경
        if (activeTab === tabId) return;
		setActiveTab(tabId);
		setLoadedTabs((prev) => new Set([...prev, tabId]));
	};

	return (
        <div id="doc-wrap" className="relative w-full h-full">
            <div
                className="flex flex-col px-5 md:px-7.5 lg:px-18 pb-8 pt-(--header-height)"
                style={{ minHeight: "100svh" }}
            >
                {/* 배경 */}
                <div className="absolute w-full inset-0 pointer-events-none isolate">
                    <div className="absolute h-555 w-210 -translate-y-75 bg-[radial-gradient(80%_70%_at_50%_30%,hsl(105_80%_60%/.4)_0%,transparent_50%)] inset-[0_auto_auto_0] -rotate-45 z-1"></div>
                    <div className="Template-bg-2 absolute hidden: lg:block inset-[0_auto_auto_0] rotate-45 z-0"></div>
                </div>

                {/* 서브 비주얼 및 타이틀 */}
                <div className="relative py-10 z-0">
                    <h1 className="font-inst font-bold text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-tight text-app-fg">
                        UI 실험실
                    </h1>
                    <p className="mt-5 text-sm md:text-base text-app-fg/50 max-w-xs leading-relaxed">
                        <span>이곳은</span>{" "}
                        <em className="italic underline decoration-app-fg/20 decoration underline-offset-4">
                            실험과 창작을 위한 공간
                        </em>{" "}
                        <span>입니다.</span>
                    </p>
                </div>

                {/* 탭 버튼 */}
                <div ref={tabButtonsRef} className="border-t border-app-fg/10 pt-2 pb-2">
                    <nav
                        className="flex gap-0"
                        aria-label="Lab sections"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                aria-selected={activeTab === tab.id}
                                className={[
                                    "relative mx-5 first:ml-0 last:mr-0 py-3.5 text-sm lg:text-xl font-medium font-inst transition-colors duration-200 cursor-pointer",
                                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transition-opacity after:duration-200",
                                    activeTab === tab.id
                                        ? "text-app-fg after:bg-app-fg after:opacity-100"
                                        : "text-app-fg/40 after:bg-app-fg after:opacity-0 hover:text-app-fg/70",
                                ].join(" ")}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* 탭 컨텐츠 */}
                <div className="flex flex-1 h-full flex-col lg:flex-row gap-10 py-10 lg:pt-20">
                    <div className="relative w-full lg:w-[50%] xl:w-[45%] 2xl:w-[40%]">
                        <h2 className="font-inst text-2xl lg:text-4xl font-bold mb-4">
                            {tabs.find((t) => t.id === activeTab)?.label}
                        </h2>
                        <p className="text-app-fg/70 max-w-75 leading-relaxed">
                            {tabs.find((t) => t.id === activeTab)?.desc}
                        </p>
                    </div>
                    {/* iframe 컨테이너 */}
                    <div className="relative w-full max-w-480 max-h-270 aspect-5/3 bg-neutral-100 dark:bg-neutral-900 border rounded-xl border-app-fg/40 dark:border-none overflow-hidden">
                        {tabs.map((tab) =>
                            loadedTabs.has(tab.id) ? (
                                <iframe
                                    key={tab.id}
                                    src={tab.src}
                                    title={tab.label}
                                    className={[
                                        "absolute inset-0 w-full h-full p-0 m-0 border-0 transition-opacity duration-300",
                                        activeTab === tab.id
                                            ? "opacity-100 pointer-events-auto"
                                            : "opacity-0 pointer-events-none",
                                    ].join(" ")}
                                />
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </div>
	);
}
