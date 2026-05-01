"use client";

import { useRef } from "react";
import { useAtomValue } from "jotai";
import { introPlayedAtom } from "@/atoms/atoms";
import CurtainIntro from "@/components/home/CurtainIntro";
import MainVisual from "@/components/home/MainVisual";
import ProjectSection from "@/components/home/ProjectSection";
import ProfileSection from "@/components/home/ProfileSection";
import WorkSection from "@/components/home/WorkSection";
import { useScrollAfterNav } from "@/hooks/useScrollAfterNav";
import Footer from "@/components/layout/Footer";
import WorkGallery from "@/components/home/WorkGallery";

export default function Home() {
	const introPlayed = useAtomValue(introPlayedAtom);

	const mainRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const mainContentsRef = useRef<HTMLDivElement>(null);

	// 서브 페이지(프로젝트 상세 등)에서 홈으로 돌아올 때 섹션 scrollTo 처리
	useScrollAfterNav();

	return (
		<>	
			<div id="doc-wrap" className="relative w-full h-full">
				{/* 메인 비주얼 */}
				<MainVisual mainRef={mainRef} headingRef={headingRef} mainContentsRef={mainContentsRef} />

				{/* 홈 컨텐츠 */}
				<div id="contents" className="w-full px-5 md:px-7.5 lg:px-18 overflow-hidden">
					{/* 프로필 섹션 */}
					<ProfileSection />

					{/* 프로젝트 섹션 */}
					<ProjectSection />

					{/* 작업 섹션 */}
					<WorkSection />
				</div>
			</div>

			{/* 작업 갤러리 */}
			<WorkGallery />

			{/* 푸터 */}
			<Footer />

			{/* 인트로 */}
			{!introPlayed && (
				<CurtainIntro mainRef={mainRef} headingRef={headingRef} mainContentsRef={mainContentsRef} />
			)}
		</>
	);
}
