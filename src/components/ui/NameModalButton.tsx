'use client';

import { useState, useCallback } from "react";
import { useSetAtom } from "jotai";
import { openModalAtom } from "@/atoms/atoms";
import CodeBlockViewer from "@/components/ui/CodeBlockViewer";
import SlideUpText from "./text/SlideUpText";

const codeString = `// Current State - 더 나은 개발자로 성장 중!
const BAE = () => {
	return (
		<WebDeveloper
			uxFriendly
			maintainable
			teamPlayer
			problemSolver
			attentionToDetail
			caffeineLevel="high"
			curiosity="infinite"
		/>
	) 
};

export default BAE;`;

export default function NameButton({
	children = "배기영",
	tooltipText = "Curious about me?"
} : {
	children?: React.ReactNode;
	tooltipText?: string;
}) {
	const openModal = useSetAtom(openModalAtom);
	const [hovered, setHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	const handleOpenModal = () => {
		openModal(
			<h2 className="font-noto font-bold text-lg text-app-fg">https://www.{children}.com</h2>,
			<CodeBlockViewer rawCode={codeString} language="tsx" />
		);
	};

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	}, []);

	return (
		<span className="relative inline-block mr-2">
			<button
				type="button"
				onClick={handleOpenModal}
				aria-label={`${children} 소개 모달 보기`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onMouseMove={handleMouseMove}
				className="group"
			>
				<SlideUpText slideUpSpeed={400}>{children}</SlideUpText>
			</button>

			{/* Floating Box — mobile / non-hover: 항상 보임, 버튼 아래 */}
			<div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 can-hover:md:hidden">
				<div className="relative px-3 py-1 bg-app-fg text-app-bg text-xs font-noto rounded-lg shadow-lg whitespace-nowrap animate-curious-float">
					{tooltipText}
					<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-app-fg" />
				</div>
			</div>

			{/* Mouse-following tooltip — desktop + hover 지원 환경에서 mouseover 시 보임 */}
			{hovered && (
				<div
					style={{ left: mousePos.x + 30, top: mousePos.y + 30 }}
					className="fixed z-50 px-2 py-1 bg-app-fg text-app-bg text-[14px] font-noto rounded-md whitespace-nowrap pointer-events-none max-md:hidden"
				>
					{tooltipText}
				</div>
			)}
		</span>
	);
}
