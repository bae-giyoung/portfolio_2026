
export default function SlideUpPill({ text, className = "" }: { text: string; className?: string }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden border border-app-fg/40 dark:border-app-fg/50 rounded-full px-8 py-3 text-sm font-medium group ${className}`}
        >
            {/* 슬라이드 배경 fill */}
            <span
                aria-hidden="true"
                className="absolute inset-0 bg-app-fg rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
            {/* 기본 텍스트 */}
            <span className="relative block text-app-fg translate-y-0 group-hover:-translate-y-[200%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none">
                {text}
            </span>
            {/* 호버 텍스트 */}
            <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-app-bg translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none"
            >
                {text}
            </span>
        </div>
    );
}