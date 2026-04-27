"use client";

import { ArrowLeft } from "lucide-react";
import { usePageTransition } from "@/components/layout/PageTransition";
import { introPlayedAtom } from "@/atoms/atoms";
import { useSetAtom } from "jotai";

const SCROLL_AFTER_NAV_KEY = "portfolioScrollAfterNav";

export default function ProjectDetailBackButton() {
    const navigate = usePageTransition();
    const setIntroPlayed = useSetAtom(introPlayedAtom);

    const handleBack = () => {
        sessionStorage.setItem(SCROLL_AFTER_NAV_KEY, "projects");
        setIntroPlayed(true);
        navigate("/");
    };

    return (
        <button
            type="button"
            onClick={handleBack}
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
