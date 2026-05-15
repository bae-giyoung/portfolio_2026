import type { StaticImageData } from "next/image";
import type { Project } from "@/datas/projectData";
import ImageBox from "@/components/ui/ImageBox";
import ProjectTechList from "./ProjectTechList";
import SlideButton from "../ui/SlideButton";
import ProjectBadge from "./ui/ProjectBadge";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import AppLink from "../layout/AppLink";
import { useToast } from "@/hooks/useToast";
import asterisk from "@/assets/icons/asterik.svg";
import Image from "next/image";

type Props = {
    project: Project;
    image: StaticImageData;
    /** 짝수 인덱스면 이미지가 오른쪽 */
    reverse?: boolean;
};

export default function ProjectDefaultCard({
    project,
    image,
    reverse = false,
}: Props) {
    const { id, title, subTitle, category, roleCategory, period, status, summary, role, tech, links } = project;
    const toast = useToast();

    return (
        <article
            className={`w-full flex flex-col md:flex-row font-inst ${
                reverse ? "md:flex-row-reverse" : ""
            } gap-8 xl:gap-16 py-10 xl:py-16 border-b border-app-fg/10 last:border-none first:pt-0 last:pb-0`}
        >
            {/* 이미지 */}
            <div className="w-full md:w-[45%] shrink-0">
                <div data-cursor-label="View">
                    <ImageBox
                        src={image}
                        alt={title}
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="rounded-xl cursor-none"
                        asLink={{
                            src: `/projects/${id}`,
                            alt: `${title} 상세 보기`,
                        }}
                    />
                </div>
                <p className="flex justify-between mt-3 text-sm text-app-fg/50">
                    <span>{category}</span>
                    <span>{period}</span>
                </p>
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col justify-center gap-5 md:gap-6 md:w-[55%]">
                <div className="flex flex-wrap items-center gap-2">
                    <ProjectBadge property={roleCategory} />
                    <ProjectBadge property={status} />
                </div>

                <h3 className="text-3xl xl:text-4xl font-bold leading-tight">
                    <AppLink href={`/projects/${id}`} className="relative hover:text-app-primary py-2 transition-colors duration-200">
                        {title}
                    </AppLink>
                </h3>

                <div>
                    <p className="flex items-center mb-3 text-[16px] md:text-lg font-bold leading-relaxed">
                        <span className="inline-block mr-2">
                            <Image src={asterisk} alt="" width={18} height={18} className="animate-[spin_3s_linear_infinite]" />
                        </span>
                        <span>{subTitle}</span>
                    </p>
                    <p className="text-[15px] text-current leading-relaxed text-app-fgs break-keep">
                        {summary}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-app-fg/70 uppercase tracking-wider mb-2">
                        역할
                    </p>
                    <p className="text-sm lg:text-[16px] text-current/80 font-bold">{role}</p>
                </div>

                <ProjectTechList tech={tech} max={6} />

                <div className="flex flex-wrap gap-3 pt-1">
                    <SlideButton as="link" href={`/projects/${id}`} alt={`${title} 상세 보기`} className="px-5!">
                        자세히 보기
                    </SlideButton>
                    {links.demo && (
                        <>
                            <SlideButton as="link" href={links.demo} alt="Demo 보기" className="px-5!">
                                <span className="flex gap-1 items-center">
                                    Demo
                                    <ExternalLink
                                        size={16}
                                        aria-hidden="true"
                                        className="text-current"
                                    />
                                </span>
                            </SlideButton>
                        </>
                    )}
                    {links.github && (
                        <SlideButton as="link" href={links.github} alt="GitHub 보기" className="px-5!">
                            <span className="flex gap-1 items-center">
                                GitHub 
                                <FaGithub
                                    size={16}
                                    aria-hidden="true"
                                    className="text-current"
                            />
                            </span>
                        </SlideButton>
                    )}
                    {!links.github && !links.demo && (
                        <SlideButton as="button" onClick={() => toast.info("Coming soon!")} revealText="준비 중" className="px-5! text-current/70 border-current/20">
                            <span className="flex gap-1 items-center">
                                Site 
                                <ExternalLink
                                    size={16}
                                    aria-hidden="true"
                                    className="text-current"
                                />
                            </span>
                        </SlideButton>
                    )}
                </div>
            </div>
        </article>
    );
}
