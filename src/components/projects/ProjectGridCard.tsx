import type { StaticImageData } from "next/image";
import type { Project } from "@/datas/projectData";
import ProjectTechList from "./ProjectTechList";
import ImageBox from "../ui/ImageBox";
import AppLink from "../layout/AppLink";
import ProjectBadge from "./ui/ProjectBadge";
import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";

type Props = {
    project: Project;
    image: StaticImageData;
};

export default function ProjectGridCard({ project, image }: Props) {
    const { id, title, subTitle, roleCategory, period, status, summary, tech } = project;

    return (
        <article className="group flex flex-col border border-app-fg/40 rounded-xl overflow-hidden hover:border-app-fg/30 transition-colors duration-300 font-inst">
            <AppLink href={`/projects/${id}`}>
                {/* 이미지 */}
                <ImageBox
                    src={image}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="block relative aspect-video overflow-hidden" 
                >
                </ImageBox>

                {/* 콘텐츠 */}
                <div className="flex flex-col gap-3 p-5 xl:p-6 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold leading-tight truncate">
                                {title}
                            </h3>
                            <p className="flex items-center text-xs md:text-[16px] lg:text-lg text-app-fg/70 font-medium mt-2">
                                <span className="inline-block mr-2">
                                    <Image src={asterisk} alt="" width={14} height={14} className="animate-[spin_3s_linear_infinite]" />
                                </span>
                                <span className="line-clamp-1 truncate">{subTitle}</span>
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <ProjectBadge property={roleCategory} />
                            <ProjectBadge property={status} />
                        </div>
                    </div>

                    <p className="text-sm leading-relaxed text-app-fg/60 break-keep line-clamp-3 flex-1">
                        {summary}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-app-fg/10">
                        <ProjectTechList tech={tech} max={4} />
                        <span className="text-xs text-app-fg/30 shrink-0 ml-2">
                            {period.split(" - ")[0]}
                        </span>
                    </div>
                </div>
            </AppLink>
        </article>
    );
}
