import type { Project } from "@/datas/projectData";
import type { StaticImageData } from "next/image";
import ProjectDefaultCard from "./ProjectDefaultCard";

type Props = {
    projects: Project[];
    images: Record<number, StaticImageData>;
};

export default function ProjectDefaultView({ projects, images }: Props) {
    return (
        <div className="w-full">
            {projects.map((project, i) => (
                <ProjectDefaultCard
                    key={project.id}
                    project={project}
                    image={images[project.id]}
                    reverse={i % 2 !== 0}
                />
            ))}
        </div>
    );
}
