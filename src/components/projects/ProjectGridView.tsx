import type { Project } from "@/datas/projectData";
import type { StaticImageData } from "next/image";
import ProjectGridCard from "./ProjectGridCard";

type Props = {
    projects: Project[];
    images: Record<number, StaticImageData>;
};

export default function ProjectGridView({ projects, images }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 w-full">
            {projects.map((project) => (
                <ProjectGridCard
                    key={project.id}
                    project={project}
                    image={images[project.id]}
                />
            ))}
        </div>
    );
}
