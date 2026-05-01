'use client';

import SectionLayout from "../ui/section/SectionLayout";
import SectionTitle from "../ui/section/SectionTitle";
import { useSetAtom } from "jotai";
import { modalStateAtom } from "@/atoms/atoms";
import { CirclePlus } from "lucide-react";
import SlideButton from "../ui/SlideButton";

export default function WorkSection() {
    const modalState = useSetAtom(modalStateAtom);
    
    const modalContent = (
        <div className="w-full h-[80vh]">
            리스트 형태로 작업 상세 설명이 들어갈 예정입니다. PDF로도 제공할 계획입니다.
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
