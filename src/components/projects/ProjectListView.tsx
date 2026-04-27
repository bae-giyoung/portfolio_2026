"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/datas/projectData";
import type { StaticImageData } from "next/image";
import ProjectBadge from "./ProjectBadge";
import AppLink from "../layout/AppLink";

type Props = {
    projects: Project[];
    images: Record<number, StaticImageData>;
};

const colStyle = {
    index: "w-8 shrink-0 text-app-fg/30 text-sm tabular-nums",
    title: "flex-1 min-w-0",
    category: "hidden md:block w-48 shrink-0 text-app-fg/60 text-sm",
    role: "hidden xl:block w-60 shrink-0 text-app-fg/60 text-sm truncate",
    period: "hidden sm:block w-28 shrink-0 text-right text-app-fg/50 text-sm",
};

export default function ProjectListView({ projects, images }: Props) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const hoveredProject = projects.find((p) => p.id === hoveredId) ?? null;

    return (
        <div className="relative w-full">
            {/* 헤더 행 */}
            <div
                className="flex items-center gap-4 px-4 py-3 border-b border-app-fg/20 text-xs font-medium uppercase tracking-wider text-app-fg/30"
                aria-hidden="true"
            >
                <span className={colStyle.index}>#</span>
                <span className={colStyle.title}>Title</span>
                <span className={colStyle.category}>Category</span>
                <span className={colStyle.role}>Role</span>
                <span className={colStyle.period}>Period</span>
            </div>

            {/* 리스트 행들 */}
            <ul>
                {projects.map((project, i) => {
                    const isHovered = hoveredId === project.id;
                    const somethingHovered = hoveredId !== null;

                    return (
                        <li key={project.id}>
                            <AppLink
                                href={`/projects/${project.id}`}
                                className="group"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div
                                    className={`flex items-center gap-4 px-4 py-5 border-b border-app-fg/10 transition-all duration-300
                                        ${somethingHovered && !isHovered ? "opacity-35" : "opacity-100"}
                                    `}
                                >
                                    <span className={colStyle.index}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div className={colStyle.title}>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-xl md:text-2xl xl:text-3xl font-bold font-inst leading-tight group-hover:text-app-primary transition-colors duration-200 truncate">
                                                {project.title}
                                            </span>
                                            <span className="flex gap-1">
                                                <ProjectBadge property={project.roleCategory} />
                                                <ProjectBadge property={project.status} />
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm lg:text-[16px] xl:text-lg text-app-fg/70 line-clamp-1 font-inst">
                                            {project.subTitle}
                                        </p>
                                    </div>

                                    <span className={colStyle.category}>
                                        {project.category}
                                    </span>

                                    <span className={colStyle.role}>
                                        {project.role}
                                    </span>

                                    <span className={colStyle.period}>
                                        {project.period.split(" - ")[0]}
                                    </span>
                                </div>
                            </AppLink>
                        </li>
                    );
                })}
            </ul>

            {/* 호버 이미지 프리뷰 */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        key={hoveredProject.id}
                        initial={{ opacity: 1, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="pointer-events-none absolute top-12 right-0 w-64 xl:w-80 rounded-xl overflow-hidden shadow-custom z-10"
                        aria-hidden="true"
                    >
                        <div className="relative aspect-4/3 w-full">
                            <Image
                                src={images[hoveredProject.id]}
                                alt={hoveredProject.title}
                                fill
                                sizes="320px"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute left-0 bottom-0 w-full bg-[linear-gradient(to_top,rgba(0,0,0,0.7),rgba(0,0,0,0))] pt-10 text-app-bg px-4 py-3">
                            <p className="font-bold text-sm font-inst">
                                {hoveredProject.title}
                            </p>
                            <p className="text-xs text-app-bg/60 mt-0.5">
                                {hoveredProject.category}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
