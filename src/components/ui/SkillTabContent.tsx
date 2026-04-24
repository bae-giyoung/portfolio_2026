import SkillCard from "./SkillCard";
import type { SkillItem } from "@/datas/profileDate";

interface SkillTabContentProps {
    skills: SkillItem[];
    capabilities?: string[];
}

export default function SkillTabContent({ skills, capabilities }: SkillTabContentProps) {
    return (
        <div>
            {/* 역량 */}
            {capabilities && capabilities.length > 0 && (
                <div className=" mb-5 px-8 py-5 border border-app-primary/40 rounded-xl bg-app-primary/1 dark:bg-transparent dark:border-app-fg/50">
                    <span className="block font-semibold text-app-primary/70 dark:text-app-fg mb-3">핵심 역량</span>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                        {capabilities.map((cap, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-[15px] text-app-fg"
                            >
                                <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-app-primary/70" />
                                {cap}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Icon 그리드 */}
            <div className="overflow-hidden rounded-xl border border-app-fg/10 dark:border-app-fg/50">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {skills.map((skill, i) => (
                        <div
                            key={i}
                            className="border-b border-r border-app-fg/8 dark:border-app-fg/40 nth-[3n]:border-r-0 sm:nth-[3n]:border-r sm:nth-[4n]:border-r-0 lg:nth-[4n]:border-r lg:nth-[5n]:border-r-0 xl:nth-[5n]:border-r xl:nth-[6n]:border-r-0 transition-colors duration-150 hover:bg-app-fg/4"
                        >
                            <SkillCard {...skill} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}