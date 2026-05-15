'use client';

import SectionLayout from "../ui/section/SectionLayout";
import SectionTitle from "../ui/section/SectionTitle";
import { useSetAtom } from "jotai";
import { modalStateAtom } from "@/atoms/atoms";
import { CirclePlus, FileDown, ExternalLink } from "lucide-react";
import SlideButton from "../ui/SlideButton";
import { workListData } from "@/datas/workData";

const colStyle = {
    index: "w-7 shrink-0 text-current/30 text-sm tabular-nums",
    title: "flex-1 min-w-0",
    description: "hidden md:block w-56 shrink-0 text-current/50 text-sm truncate",
    link: "w-5 shrink-0 flex items-center justify-end",
};

function WorkListContent() {
    return (
        <div className="w-full">
            <div className="flex items-center gap-4 px-4 py-3 border-b border-current/30 text-xs font-medium uppercase tracking-wider text-current/60" aria-hidden="true">
                <span className={colStyle.index}>#</span>
                <span className={colStyle.title}>Title</span>
                <span className={colStyle.description}>Description</span>
                <span className={colStyle.link} />
            </div>

            <ul>
                {workListData.map(({ title, description, link }, i) => {
                    const Tag = link ? "a" : "div";
                    const linkProps = link
                        ? { href: link, target: "_blank", rel: "noopener noreferrer" }
                        : {};

                    return (
                        <li key={i}>
                            <Tag
                                {...linkProps}
                                className="group"
                            >
                                <div
                                    className={`flex items-center gap-4 px-4 py-4 border-b border-current/8 transition-all duration-300`}
                                >
                                    <span className={colStyle.index}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div className={colStyle.title}>
                                        <span className="block text-base font-semibold leading-snug group-hover:text-app-primary transition-colors duration-200 truncate">
                                            {title}
                                        </span>
                                        {description && (
                                            <span className="md:hidden block text-[12px] text-current/50 mt-0.5 truncate">
                                                {description}
                                            </span>
                                        )}
                                    </div>

                                    <span className={colStyle.description}>{description}</span>

                                    <span className={`${colStyle.link} text-current/25 group-hover:text-app-primary transition-colors duration-200`}>
                                        {link && <ExternalLink strokeWidth={1.25} size={14} />}
                                    </span>
                                </div>
                            </Tag>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function WorkSection() {
    const modalState = useSetAtom(modalStateAtom);

    const openModal = () => {
        modalState({
            isOpen: true,
            header: "전체 작업 리스트",
            content: (
                <div className="w-full">
                    {/* 상단 버튼 그룹 */}
                    <div className="flex justify-between items-center px-4 pt-1 pb-4">
                        <h2 className="text-2xl font-bold">Works</h2>
                        <SlideButton as="download" href="/docs/works/career-certificate.pdf" downloadAs="배기영_경력증명서.pdf" alt="경력 증명서 다운로드">
                            <span className="flex items-center gap-1">
                                <FileDown strokeWidth={1} size={16} />
                                경력 증명서
                            </span>
                        </SlideButton>
                    </div>
                    {/* 작업 리스트 */}
                    <WorkListContent />
                </div>
            ),
        });
    }

    return (
        <SectionLayout
            sectionId="works"
            sectionMeta={{ number: "04", category: "works", label: "2023-2025" }}
            sectionTitle=""
        >

            {/* 섹션 타이틀 */}
            <div className="relative w-full flex justify-between items-center gap-10 lg:gap-20">
                <div className="relative w-max-content">
                    <SectionTitle>Works</SectionTitle>
                </div>
            </div>

            {/* 섹션 설명 */}
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
