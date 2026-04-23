export default function ToolTipText({
	text = "배기영",
	tooltipText = "Curious about me?"
} : {
	text?: string;
	tooltipText?: string;
}) {

	return (
		<span className="relative inline-block mr-2">
			<span>
				{text}
			</span>

			{/* Floating Box — mobile / non-hover: 항상 보임, 버튼 아래 */}
			<div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 can-hover:md:hidden">
				<div className="relative px-3 py-1 bg-app-fg text-app-bg text-xs font-noto rounded-lg shadow-lg whitespace-nowrap animate-curious-float">
					{tooltipText}
					<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-app-fg" />
				</div>
			</div>
		</span>
	);
}
