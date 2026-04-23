

"use client";

import { useRef } from "react";
import CurtainIntro from "@/components/home/CurtainIntro";
import Header from "@/components/layout/Header";
import MainVisual from "@/components/home/MainVisual";
import ProjectSection from "@/components/home/ProjectSection";
import ProfileSection from "@/components/home/ProfileSection";
import WorkSection from "@/components/home/WorkSection";

export default function Home() {

	const headerRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const mainContentsRef = useRef<HTMLDivElement>(null);

	return (
		<>
			{/* 헤더 */}
			<Header headerRef={headerRef} />
			
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

			{/* 푸터 */}
			<footer className="relative w-full h-80 bg-app-fg text-app-bg">footer</footer>

			{/* 인트로 */}
			<CurtainIntro headerRef={headerRef} mainRef={mainRef} headingRef={headingRef} mainContentsRef={mainContentsRef} />
		</>
	);
}
