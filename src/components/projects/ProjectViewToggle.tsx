"use client";

import { LayoutGrid, AlignJustify, Rows3 } from "lucide-react";

type ProjectViewMode = "default" | "list" | "grid";

type ProjectViewToggleProps = {
    current: ProjectViewMode;
    onChange: (mode: ProjectViewMode) => void;
};

const views: { mode: ProjectViewMode; label: string; Icon: React.ElementType }[] = [
    { mode: "default", label: "크게 보기", Icon: Rows3 },
    { mode: "grid", label: "작게 보기", Icon: LayoutGrid },
    { mode: "list", label: "리스트 보기", Icon: AlignJustify },
];

export default function ProjectViewToggle({
    current,
    onChange,
}: ProjectViewToggleProps) {
    return (
        <div
            className="inline-flex items-center border border-app-fg/20 rounded-lg overflow-hidden"
            role="group"
            aria-label="프로젝트 보기 방식 선택"
        >
            {views.map(({ mode, label, Icon }) => {
                const isActive = current === mode;
                return (
                    <button
                        key={mode}
                        type="button"
                        onClick={() => onChange(mode)}
                        aria-label={label}
                        aria-pressed={isActive}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors duration-200
                            ${
                                isActive
                                    ? "bg-app-fg text-app-bg"
                                    : "text-app-fg/50 hover:text-app-fg hover:bg-app-fg/5"
                            }`}
                    >
                        <Icon size={14} aria-hidden="true" />
                        <span className="hidden sm:inline">{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
