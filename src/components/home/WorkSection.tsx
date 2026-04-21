'use client';

import Image from "next/image";
import MulAlim from "@/assets/project_mulalim.webp";
import SectionTitle from "../ui/SectionTitle";
import SectionMeta from "../ui/SectionMeta";

export default function WorkSection() {
    return (
        <section id="works" className="relative w-full flex flex-col gap-10 sm:gap-20 mt-20 pt-8 pb-20 border-t border-app-fg font-inst">
            {/* 섹션 메타 */}
            <SectionMeta number="04" category="works" label="2023-2025" />

            {/* 섹션 타이틀 */}
            <SectionTitle className="text-9xl font-bold text-app-fg overflow-hidden">Works</SectionTitle>

            {/* 대표 작업 2개 */}
            <div className="w-full flex justify-between">
                <div className="w-[50%] pt-20">
                    <div className="relative w-full h-100 rounded-xl overflow-hidden">
                        <Image src={MulAlim} alt="Work 1" fill className="object-cover" />
                    </div>
                    <p className="flex justify-between mt-4">
                        <span>현대 트랜시스</span>
                        <span>퍼블리싱</span>
                        <span>2024.11 - 2025.04</span>
                    </p>
                </div>

                <div className="w-[30%] -mt-20">
                    <div className="relative w-full h-100 rounded-xl overflow-hidden">
                        <Image src={MulAlim} alt="Work 2" fill className="object-cover" />
                    </div>
                    <p className="flex justify-between mt-4">
                        <span>영렘브란트 사이트 구축</span>
                        <span>퍼블리싱</span>
                        <span>2024.11 - 2025.04</span>
                    </p>
                </div>
            </div>

            {/* 작업 갤러리 */}
            <div className="flex flex-col gap-10 mt-20">
                갤러리 컴포넌트 구상하기!
                작업 사이트 링크(경복대학교, 울산과학대학교, 대동대학교, 벡스코, 부산여성가족부 평생교육진흥원, 경인교육대학교, UbiDecision 등등 전부)
            </div>
        </section>
    );
}