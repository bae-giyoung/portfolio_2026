"use client";

const defaultClassName = "relative inline-flex items-center justify-center group transition-colors leading-[1] overflow-hidden";

export default function SlideUpText({
    children,
    className = "",
    slideUpSpeed = 500, // 슬라이드 업 속도 (ms)
} : {
    children: React.ReactNode;
    className?: string;
    slideUpSpeed?: number;
}) {

    const content = (
		<>
			{/* 기본 텍스트: 호버 시 위로 빠져나감 */}
			<span
				className="relative block translate-y-0 group-hover:-translate-y-[200%] transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none"
                style={{ transitionDuration: `${slideUpSpeed}ms` }}
			>
				{children}
			</span>

			{/* 호버 텍스트: 아래에서 위로 올라옴 */}
			<span
				aria-hidden="true"
				className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none"
                style={{ transitionDuration: `${slideUpSpeed}ms` }}
			>
				{children}
			</span>
		</>
	);

    return (
        <span className={`${defaultClassName} ${className}`} style={{ transitionDuration: `${slideUpSpeed}ms` }}>
            {content}
        </span>
    );
}