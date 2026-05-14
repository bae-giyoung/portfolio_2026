"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ProjectDetail } from "@/datas/projectData";
import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";

type Challenge = ProjectDetail["technicalChallenges"][number];

function ChallengeItem({
    challenge,
    index,
}: {
    challenge: Challenge;
    index: number;
}) {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div className="border-b border-app-fg/10 last:border-none">
            {/* 헤더 */}
            <button
                type="button"
                className="w-full flex items-start justify-between gap-4 py-5 xl:py-6 text-left group"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
            >
                <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-xs font-mono text-app-fg/70 shrink-0 w-5">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] xl:text-lg font-semibold font-inst leading-snug break-keep group-hover:text-app-primary transition-colors duration-200">
                        {challenge.title}
                    </span>
                </div>
                <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 mt-0.5 text-app-fg/40 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* 콘텐츠 - 아코디언 */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100 pb-6" : "max-h-0 opacity-0 pb-0"
                }`}
            >
                <div className="ml-9 grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6">
                    {/* Problem */}
                    <div className="p-4 rounded-xl border border-app-fg/10 bg-app-fg/2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-app-fg/50 mb-3">
                            Problem
                        </p>
                        <p className="text-sm leading-relaxed text-app-fg/65 break-keep">
                            {challenge.problem}
                        </p>
                    </div>
                    {/* Solution */}
                    <div className="p-4 rounded-xl border border-app-primary/20 bg-app-primary/3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-app-primary/60 mb-3">
                            Solution
                        </p>
                        <p className="text-sm leading-relaxed text-app-fg/65 break-keep">
                            {challenge.solution}
                        </p>
                    </div>
                    {/* Result */}
                    <div className="p-4 rounded-xl border border-app-fg/10 bg-app-fg/2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-app-fg/50 mb-3">
                            Result
                        </p>
                        <p className="text-sm leading-relaxed text-app-fg/65 break-keep">
                            {challenge.result}
                        </p>
                    </div>
                </div>
                {challenge.image && (
                    <div className="ml-9 mt-5 bg-[#f6f5f4] rounded-xl border border-app-fg/10">
                        <Image
                            src={challenge.image}
                            alt={challenge.title}
                            width={1200}
                            height={600}
                            className="w-full max-w-225"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProjectDetailChallenges({
    challenges,
}: {
    challenges: ProjectDetail["technicalChallenges"];
}) {
    return (
        <section className="w-full">
            <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-2">
                <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>기술적 문제 해결
            </h2>
            <div className="mt-4">
                {challenges.map((challenge, i) => (
                    <ChallengeItem key={i} challenge={challenge} index={i} />
                ))}
            </div>
        </section>
    );
}
