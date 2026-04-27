"use client";

import { usePageTransition } from "@/components/layout/PageTransition";
import { introPlayedAtom } from "@/atoms/atoms";
import { useSetAtom } from "jotai";
import { SCROLL_AFTER_NAV_KEY } from "@/constants/layout";

/**
 * [홈으로 돌아가는 버튼에서 사용할 훅]
 * - 홈 인트로 애니메이션 재생 안함
 */
export default function useBackToHome() {
    const navigate = usePageTransition();
    const setIntroPlayed = useSetAtom(introPlayedAtom);

    const goBackToHome = (sectionId: string) => {
        setIntroPlayed(true);
        sessionStorage.setItem(SCROLL_AFTER_NAV_KEY, sectionId);
        navigate("/");
    }

    return goBackToHome;
}