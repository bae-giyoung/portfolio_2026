import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectDetails, projects } from "@/datas/projectData";
import { projectImageMap } from "@/components/projects/constants/projectImageMap";
import ProjectDetailHero from "@/components/projects/detail/ProjectDetailHero";
import ProjectDetailOverview from "@/components/projects/detail/ProjectDetailOverview";
import ProjectDetailChallenges from "@/components/projects/detail/ProjectDetailChallenges";
import ProjectDetailArchitecture from "@/components/projects/detail/ProjectDetailArchitecture";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectDetailSpecs from "@/components/projects/detail/ProjectDetailSpecs";

/** 빌드 타임 정적 경로 생성 */
export function generateStaticParams() {
    return projectDetails.map((p) => ({ id: String(p.id) }));
}

/** 동적 메타데이터 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = projectDetails.find((p) => p.id === Number(id));
    if (!project) return {};

    return {
        title: `${project.title} | Projects`,
        description: project.overview.summary,
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const numId = Number(id);

    const project = projectDetails.find((p) => p.id === numId);
    if (!project) notFound();

    // Project(카드 데이터)에서 problem/solution/impact 참조
    const projectCard = projects.find((p) => p.id === numId);

    const image = projectImageMap[project.id];
    const currentIndex = projectDetails.findIndex((p) => p.id === numId);
    const prevProject = currentIndex > 0 ? projectDetails[currentIndex - 1] : null;
    const nextProject =
        currentIndex < projectDetails.length - 1
            ? projectDetails[currentIndex + 1]
            : null;

    return (
        <div id="doc-wrap" className="relative w-full h-full">
            {/* 프로젝트 상세보기 페이지 */}
            <div className="w-full px-5 md:px-7.5 lg:px-18 pt-(--header-height) max-w-480 mx-auto font-inst break-keep">

                {/* 메타 정보 */}
                <ProjectDetailHero project={project} />

                {/* 본문 */}
                <div className="flex flex-col gap-16 xl:gap-20 pb-20 xl:pb-28 pt-10">

                    <div className="flex flex-col lg:flex-row gap-10 justify-between">
                        {/* 대표 이미지 */}
                        <div className="relative w-full sm:w-[70%] lg:w-[50%] shrink-0 aspect-video rounded-2xl mx-auto lg:mx-0 overflow-hidden">
                            <Image
                                src={image}
                                alt={project.title}
                                fill
                                priority
                                sizes="(max-width: 1920px) 100vw"
                                className="object-cover"
                                />
                        </div>
                        {/* 개요 (배경 / 성과) */}
                        <ProjectDetailOverview
                            background={project.background}
                            impact={projectCard?.impact ?? project.keyFeatures}
                        />
                    </div>

                    {/* 주요 기능 + 기술 스택 */}
                    <ProjectDetailSpecs
                        keyFeatures={project.keyFeatures}
                        techStack={project.techStack}
                    />

                    {/* 아키텍처 */}
                    <ProjectDetailArchitecture architecture={project.architecture} />

                    {/* 클라이언트 진입 흐름 */}
                    {/* {project.clientFlow && (
                        <ProjectDetailClientFlow clientFlow={project.clientFlow} />
                    )} */}
                    
                    {/* 기술적 도전 아코디언 */}
                    <ProjectDetailChallenges challenges={project.technicalChallenges} />
                </div>

                {/* 이전 / 다음 프로젝트 탐색 */}
                <nav
                    aria-label="프로젝트 탐색"
                    className="border-t border-app-fg/10 py-10 flex justify-between gap-4"
                >
                    {prevProject ? (
                        <Link
                            href={`/projects/${prevProject.id}`}
                            className="group flex items-center gap-3 text-app-fg/50 hover:text-app-fg transition-colors duration-200"
                        >
                            <ArrowLeft
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:-translate-x-1"
                            />
                            <div>
                                <p className="text-xs uppercase tracking-wider mb-0.5">Previous</p>
                                <p className="text-base font-semibold">{prevProject.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <span />
                    )}

                    {nextProject ? (
                        <Link
                            href={`/projects/${nextProject.id}`}
                            className="group flex items-center gap-3 text-right text-app-fg/50 hover:text-app-fg transition-colors duration-200"
                        >
                            <div>
                                <p className="text-xs uppercase tracking-wider mb-0.5">Next</p>
                                <p className="text-base font-semibold">{nextProject.title}</p>
                            </div>
                            <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>
            </div>
        </div>
    );
}
