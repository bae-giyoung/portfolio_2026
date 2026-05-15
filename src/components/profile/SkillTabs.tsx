"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SkillTabContent from "./SkillTabContent";
import {
    frontendSkillItems, frontendCaps,
    backendSkillItems,  backendCaps,
    dataAiSkillItems,   dataAiCaps,
    toolsSkillItems,    toolsCaps,
} from "@/datas/profileDate";

type TabId = "frontend" | "backend" | "data" | "tools";

const TABS: { id: TabId; label: string }[] = [
    { id: "frontend", label: "프론트엔드" },
    { id: "backend",  label: "백엔드" },
    { id: "data", label: "Data / AI" },
    { id: "tools", label: "Tools / Infra" },
];

const TAB_DATA = {
    frontend: { skills: frontendSkillItems, capabilities: frontendCaps },
    backend:  { skills: backendSkillItems,  capabilities: backendCaps  },
    data:     { skills: dataAiSkillItems,   capabilities: dataAiCaps   },
    tools:    { skills: toolsSkillItems,    capabilities: toolsCaps    },
} satisfies Record<TabId, { skills: unknown[]; capabilities: string[] }>;

export default function SkillTabs() {
    const [active, setActive] = useState<TabId>("frontend");

    return (
        <div>
            {/* Tab 상단 버튼 */}
            <div className="flex items-end gap-4 border-b border-black/10 dark:border-white/10 mb-6">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setActive(id)}
                        className={`
                            relative px-0 py-2.5 text-sm lg:text-xl font-medium transition-colors duration-200 cursor-pointer
                            ${active === id ? "text-app-fg" : "text-app-fg/60 hover:text-app-fg"}
                        `}
                    >
                        {label}
                        {active === id && (
                            <motion.span
                                layoutId="skill-tab-indicator"
                                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-app-fg"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab 컨텐츠
                - 모든 탭을 항상 마운트 유지 -> 이미지가 DOM에서 제거되지 않으므로 재요청/깜빡임 없음
                - 비활성 탭은 hidden(display:none)으로 숨김 -> 전환 즉시 표시
            */}
            <div>
                {TABS.map(({ id }) => (
                    <div
                        key={id}
                        aria-hidden={id !== active}
                        className={id !== active ? "hidden" : undefined}
                    >
                        <SkillTabContent
                            skills={TAB_DATA[id].skills}
                            capabilities={TAB_DATA[id].capabilities}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
