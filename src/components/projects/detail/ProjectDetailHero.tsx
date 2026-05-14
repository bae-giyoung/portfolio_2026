import type { ProjectDetail } from "@/datas/projectData";
import ProjectDetailBackButton from "./ProjectDetailBackButton";
import ProjectBadge from "../ui/ProjectBadge";
import ProjectDetailLinks from "./ProjectDetailLinks";

type Props = {
    project: ProjectDetail;
};

export default function ProjectDetailHero({ project }: Props) {
    const { title, overview } = project;

    return (
        <div className="pt-10 pb-12 xl:pt-14 xl:pb-16 border-b border-app-fg/15">
            {/* 뒤로가기 */}
            <ProjectDetailBackButton />

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
                <ProjectBadge property={overview.roleCategory} />
                <ProjectBadge property={overview.status} />
                <span className="text-sm text-app-fg/40 font-inst">{overview.period}</span>
            </div>

            {/* 타이틀 */}
            <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold font-inst leading-[1.1] break-keep">
                {title}
            </h1>

            {/* 요약 */}
            <p className="mt-5 text-lg xl:text-xl text-app-fg/60 max-w-3xl leading-relaxed break-keep">
                {overview.summary}
            </p>

            {/* 역할 */}
            <div className="mt-6 inline-block text-[16px] font-medium uppercase tracking-wider text-app-fg/70">
                <span className="font-inst">{overview.team}</span>
                <span>
                    &nbsp;Role
                </span>
                <p className="mt-1.5 text-base font-medium text-app-primary font-inst">
                    {overview.role}
                </p>
            </div>

            {/* 링크 */}
            <ProjectDetailLinks links={project.links} />
        </div>
    );
}
