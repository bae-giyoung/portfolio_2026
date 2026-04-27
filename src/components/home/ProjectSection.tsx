'use client';

import { useAtom } from "jotai";
import { projectViewModeAtom } from "@/atoms/atoms";
import SectionLayout from "../ui/section/SectionLayout";
import ProjectViewToggle from "@/components/projects/ProjectViewToggle";
import ProjectDefaultView from "@/components/projects/ProjectDefaultView";
import ProjectListView from "@/components/projects/ProjectListView";
import ProjectGridView from "@/components/projects/ProjectGridView";
import { projects } from "@/datas/projectData";
import { projectImageMap } from "@/components/projects/constants/projectImageMap";

export default function ProjectSection() {
    const [viewMode, setViewMode] = useAtom(projectViewModeAtom);

    return (
        <SectionLayout
            sectionId="projects"
            sectionMeta={{ number: "03", category: "projects", label: "2025-2026" }}
            sectionTitle="Projects"
        >
            {/* 보기 토글 */}
            <div className="flex justify-end">
                <ProjectViewToggle current={viewMode} onChange={setViewMode} />
            </div>

            {/* 보기 뷰 */}
            {viewMode === "default" && (
                <ProjectDefaultView projects={projects} images={projectImageMap} />
            )}
            {viewMode === "list" && (
                <ProjectListView projects={projects} images={projectImageMap} />
            )}
            {viewMode === "grid" && (
                <ProjectGridView projects={projects} images={projectImageMap} />
            )}

        </SectionLayout>
    );
}
