"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SkillTabContent from "./SkillTabContent";
import {
    frontendSkillItems, frontendCaps,
    backendSkillItems,  backendCaps,
    dataAiSkillItems,   dataAiCaps,
    toolsSkillItems,    toolsCaps,
} from "@/datas/profileDate";

type TabId = "frontend" | "backend" | "data" | "tools" | "all";

const TABS: { id: TabId; label: string }[] = [
    { id: "frontend", label: "프론트엔드" },
    { id: "backend",  label: "백엔드" },
    { id: "data", label: "Data / AI" },
    { id: "tools", label: "Tools / Infra" },
    /* { id: "all", label: "All" }, */
];

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

            {/* Tab 컨텐츠 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                >
                    {active === "all" ? (
                        <SkillTabContent
                            skills={[...frontendSkillItems, ...backendSkillItems, ...dataAiSkillItems, ...toolsSkillItems]}
                            capabilities={[...frontendCaps, ...backendCaps, ...dataAiCaps, ...toolsCaps]}
                        />
                    ) : active === "frontend" ? (
                        <SkillTabContent skills={frontendSkillItems} capabilities={frontendCaps} />
                    ) : active === "backend" ? (
                        <SkillTabContent skills={backendSkillItems} capabilities={backendCaps} />
                    ) : active === "data" ? (
                        <SkillTabContent skills={dataAiSkillItems} capabilities={dataAiCaps} />
                    ) : active === "tools" ? (
                        <SkillTabContent skills={toolsSkillItems} capabilities={toolsCaps} />
                    ) : null}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
