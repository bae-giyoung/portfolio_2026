'use client';

import SectionLayout from "../ui/section/SectionLayout";
import SectionTitle from "../ui/section/SectionTitle";
import { useSetAtom } from "jotai";
import { modalStateAtom } from "@/atoms/atoms";
import { CirclePlus, FileDown, ExternalLink } from "lucide-react";
import SlideButton from "../ui/SlideButton";
import { workListData } from "@/datas/workData";

export default function WorkSection() {
    const modalState = useSetAtom(modalStateAtom);
    
    const modalContent = (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold mr-4">Works</h2>
                <SlideButton as="download" href="/docs/works/배기영_소프트웨어기술자+경력증명서.pdf" alt="경력 증명서 다운로드">
                    <span className="flex items-center gap-1">
                        <FileDown strokeWidth={1} size={18} />
                        경력 증명서
                    </span>
                </SlideButton>
            </div>
            <ul className="w-full divide-y divide-black/8 dark:divide-white/8">
                {
                    workListData.map(({title, description, period, link}, i) => {
                        const Tag = link ? "a" : "div";
                        const linkProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};
                        return (
                            <li key={i}>
                                <Tag
                                    {...linkProps}
                                    className={`group flex items-center justify-between gap-4 py-3.5 sm:py-4 ${link ? "cursor-pointer" : ""}`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <span className="block font-semibold text-base leading-snug mb-0.5 group-hover:text-app-primary transition-colors duration-200">
                                            {title}
                                        </span>
                                        {description && (
                                            <span className="block text-[13px] text-current/50 leading-relaxed truncate">
                                                {description}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        {period && (
                                            <span className="text-xs text-current/40 tabular-nums">{period}</span>
                                        )}
                                        {link && (
                                            <span className="text-xs font-medium text-current/30 group-hover:text-app-primary transition-colors duration-200 whitespace-nowrap">
                                                <ExternalLink strokeWidth={1.25} size={14} />
                                            </span>
                                        )}
                                    </div>
                                </Tag>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
    
    const openModal = () => {
        modalState({
            isOpen: true,
            header: "전체 작업 리스트",
            content: modalContent,
        });
    }

    return (
        <SectionLayout
            sectionId="works"
            sectionMeta={{ number: "04", category: "works", label: "2023-2025" }}
            sectionTitle=""
        >

            {/*  */}
            <div className="relative w-full flex justify-between items-center gap-10 lg:gap-20">
                <div className="relative w-max-content">
                    <SectionTitle>Works</SectionTitle>
                </div>
            </div>

            <p className="w-full text-app-fg text-lg leading-relaxed">
                <span className="block">실무에서 참여한 웹사이트 퍼블리싱 작업입니다.</span> 
                <span className="block">공개된 사이트 기준으로 정리했습니다. 각 카드의 <em className="italic underline decoration-app-fg/20 decoration underline-offset-4 mr-2">사이트 보기</em> 버튼을 클릭하면 해당 사이트로 이동합니다.</span>
                <SlideButton onClick={openModal} className="mt-4">
                    <span className="flex items-center gap-1">
                        <CirclePlus size={18} strokeWidth={1.25} />
                        전체 리스트 보기
                    </span>
                </SlideButton>
            </p>
        </SectionLayout>
    );
}
