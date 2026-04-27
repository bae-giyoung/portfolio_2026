import type { ProjectStatus, ProjectRoleCategory } from "@/datas/projectData";

const statusConfig: Record<
    ProjectStatus,
    { label: string; className: string }
> = {
    Completed : {
        label: "완료",
        className: "bg-app-fg/5 text-app-fg/40",
    },
    InProgress: {
        label: "진행중",
        className: "bg-app-fg/5 text-app-fg/40",
    },
};

const categoryConfig: Record<
    ProjectRoleCategory,
    { label: string; className: string }
> = {
    Frontend: {
        label: "프론트엔드",
        className: "bg-app-primary/15 text-app-primary border border-transparent dark:border-app-primary",
    },
    Backend: {
        label: "백엔드",
        className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-transparent dark:border-blue-400",
    },
    FullStack: {
        label: "풀스택",
        className: "bg-app-fg text-app-bg dark:text-app-bg/70 border border-transparent dark:border-app-fg/70",
    },
};

export default function ProjectBadge({
    property,
}: {
    property: ProjectStatus | ProjectRoleCategory;
}) {
    const { label, className } = statusConfig[property as ProjectStatus] || categoryConfig[property as ProjectRoleCategory];
    
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 text-xs lg:text-[16px] font-semibold tracking-wide rounded-full ${className}`}
        >
            {label}
        </span>
    );
}
