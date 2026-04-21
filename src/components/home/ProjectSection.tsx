'use client';

import Image from "next/image";
import MulAlim from "@/assets/project_mulalim.webp";
import SectionMeta from "@/components/ui/SectionMeta";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ProjectSection() {
    return (
        <section id="projects" className="relative w-full flex flex-col gap-10 sm:gap-20 mt-20 pt-8 pb-20 border-t border-app-fg font-inst">
            {/* 섹션 메타 */}
            <SectionMeta number="03" category="projects" label="2025-2026" />
    
            {/* 섹션 타이틀 */}
            <SectionTitle className="text-9xl font-bold text-app-fg overflow-hidden">Projects</SectionTitle>

            {/* 물알림단 프로젝트 */}
            <div className="w-full flex justify-between">
                <div className="w-[50%] pt-10">
                    <div className="relative w-full h-100 rounded-xl overflow-hidden">
                        <Image src={MulAlim} alt="물알림단 프로젝트" fill className="object-cover" />
                    </div>
                    <p className="flex justify-between mt-4">
                        <span>MulAlim</span>
                        <span>2025.09 - 2025.11</span>
                    </p>
                </div>
                <div className="w-[30%] flex flex-col gap-10">
                    <h3 className="text-4xl font-bold">물알림단 프로젝트</h3>
                    <div className="leading-relaxed">
                        물알림단은 지하수 관측 데이터와 예측 데이터를 시각적으로 제공하는 웹 대시보드 프로젝트입니다. 
                        <br />
                        팀 프로젝트에서 프론트엔드를 담당했으며, Next.js가 BFF 역할을 수행해 외부 Open API 데이터를 
                        직접 수집하고 가공한 뒤, 지하수위 추이와 예측 결과를 차트와 표로 보여주는 화면을 구현했습니다.
                    </div>
                </div>
            </div>

            {/* 물알림단 v.2.0. */}
            <div className="w-full flex justify-between">
                <div className="w-[50%] pt-10">
                    <div className="relative w-full h-100 rounded-xl overflow-hidden">
                        <Image src={MulAlim} alt="물알림단 v.2.0 프로젝트" fill className="object-cover" />
                    </div>
                    <p className="flex justify-between mt-4">
                        <span>MulAlim v2.0</span>
                        <span>2026.03 - 진행중</span>
                    </p>
                </div>
                <div className="w-[30%] flex flex-col gap-10">
                    <h3 className="text-4xl font-bold">물알림단 v2.0</h3>
                    <div className="leading-relaxed">
                        <p className="mb-4">
                            물알림단 v2.0은 기존 프론트 중심 구조를 Spring Boot 중심 구조로 재설계한 개인 리팩토링 프로젝트입니다.
                        </p>
                        <p className="mb-4">
                            백엔드, 프론트엔드, FastAPI를 모두 혼자서 개발하며, 각 기술의 역할과 책임을 명확히 분리하는 데 중점을 두었습니다.
                        </p>
                        <p className="mb-4">
                            AWS 배포를 계획하고 있으며, 이를 통해 실제 운영 환경에서의 성능과 안정성을 개선하고자 합니다.
                        </p>
                        <ul className="pl-5 flex flex-col gap-2 text-gray-700">
                            <li>
                                Spring Boot가 외부 데이터 수집, 배치 적재, 집계 로직, REST API를 담당하는 데이터 허브이자 Gateway 역할을 맡고,
                            </li>
                            <li>
                                Next.js는 렌더링 전용 서버로 역할을 축소했으며,
                            </li>
                            <li>
                                FastAPI는 전처리·추론 중심의 AI 서버로 분리해 전체 책임을 명확하게 정리했습니다.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 미니 노션 프로젝트 */}
            <div className="w-full flex justify-between">
                <div className="w-[50%] pt-10">
                    <div className="relative w-full h-100 rounded-xl overflow-hidden">
                        <Image src={MulAlim} alt="미니 노션 프로젝트" fill className="object-cover" />
                    </div>
                    <p className="flex justify-between mt-4">
                        <span>Mini Notion</span>
                        <span>2026.04 - 진행중</span>
                    </p>
                </div>
                <div className="w-[30%] flex flex-col gap-10">
                    <h3 className="text-4xl font-bold">Mini Notion</h3>
                    <div className="leading-relaxed">
                        <p className="mb-4">
                            Mini Notion은 Next.js와 Supabase를 활용해 만든 개인 프로젝트로, 노션과 유사한 인터페이스를 가진 간단한 노트 앱입니다.
                        </p>
                        <p className="mb-4">
                            이 프로젝트에서는 Next.js의 최신 기능인 App Router와 Server Components를 활용해 프론트엔드와 백엔드가 긴밀하게 통합된 애플리케이션을 구축하는 데 중점을 두었습니다.
                        </p>
                        <p className="mb-4">
                            Supabase는 데이터베이스와 인증을 담당하며, Next.js는 사용자 인터페이스와 서버 사이드 로직을 처리하는 구조로 설계했습니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}