import Link from "next/link";

interface SlideButtonBaseProps {
    children: React.ReactNode;
    className?: string;
}

interface SlideButtonAsButton extends SlideButtonBaseProps {
    as?: "button";
    href?: never;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}

interface SlideButtonAsLink extends SlideButtonBaseProps {
    as: "link";
    href: string;
    onClick?: never;
    type?: never;
}

type SlideButtonProps = SlideButtonAsButton | SlideButtonAsLink;

const innerClassName = "relative inline-flex items-center justify-center overflow-hidden border border-app-fg rounded-lg px-8 py-3.5 text-sm font-medium tracking-wide group transition-colors duration-500 cursor-pointer";

export default function SlideButton({
    children,
    className = "",
    ...props
}: SlideButtonProps) {
    const content = (
        <>
            {/* 슬라이드 배경 fill: 아래에서 위로 */}
            <span
                aria-hidden="true"
                className="absolute inset-0 bg-app-fg translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-none"
            />

            {/* 기본 텍스트: 호버 시 위로 빠져나감 */}
            <span
                className="relative block text-app-fg translate-y-0 group-hover:-translate-y-[200%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none"
            >
                {children}
            </span>

            {/* 호버 텍스트: 아래에서 위로 올라옴 */}
            <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-app-bg translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none"
            >
                {children}
            </span>
        </>
    );

    if (props.as === "link") {
        return (
            <Link href={props.href} className={`${innerClassName} ${className}`}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={props.type ?? "button"}
            onClick={props.onClick}
            className={`${innerClassName} ${className}`}
        >
            {content}
        </button>
    );
}
