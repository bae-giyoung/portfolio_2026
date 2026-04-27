"use client";

import { ArrowLeft } from "lucide-react";
import useBackToHome from "@/hooks/useBackToHome";

export default function ProjectDetailBackButton() {
    const handleBack = useBackToHome();

    return (
        <button
            type="button"
            onClick={() => handleBack("projects")}
            className="inline-flex items-center gap-1.5 text-sm text-app-fg/40 hover:text-app-fg transition-colors duration-200 mb-8 group"
        >
            <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Projects
        </button>
    );
}
