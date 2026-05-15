import AppLink from "@/components/layout/AppLink";
interface SlideButtonBaseProps {
    children: React.ReactNode;
    className?: string;
    revealText?: string;
    revealTextColor?: string;
    revealTextBgColor?: string;
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
    alt?: string;
}

interface SlideButtonAsDownload extends SlideButtonBaseProps {
    as: "download";
    href: string;
    /** 저장 시 사용할 파일명 (한글 등 지정 가능) */
    downloadAs?: string;
    onClick?: never;
    type?: never;
    alt?: string;
}

type SlideButtonProps = SlideButtonAsButton | SlideButtonAsLink | SlideButtonAsDownload;

const innerClassName = "relative inline-flex items-center justify-center overflow-hidden border border-app-fg rounded-lg px-6 md:px-8 py-2.5 md:py-3.5 text-sm font-medium tracking-wide group transition-colors duration-500 cursor-pointer";

export default function SlideButton({
    children,
    className = "",
    revealText = "",
    revealTextColor = "text-app-bg",
    revealTextBgColor = "bg-app-fg",
    ...props
}: SlideButtonProps) {

    const content = (
        <>
            {/* 슬라이드 배경 fill: 아래에서 위로 */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 ${revealTextBgColor} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-none`}
            />

            {/* 기본 텍스트: 호버 시 위로 빠져나감 */}
            <span
                className={`relative block text-app-fg translate-y-0 group-hover:-translate-y-[200%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none`}
            >
                {children}
            </span>

            {/* 호버 텍스트: 아래에서 위로 올라옴 */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center ${revealTextColor} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-none`}
            >
                {revealText || children}
            </span>
        </>
    );

    // 다운로드
    if (props.as === "download") {
        return (
            <a
                href={props.href}
                download={props.downloadAs ?? true}
                className={`${innerClassName} ${className}`}
                aria-label={props.alt || undefined}
            >
                {content}
            </a>
        )
    }

    // 링크
    if (props.as === "link") {
        return (
            <AppLink href={props.href} className={`${innerClassName} ${className}`} aria-label={props.alt || undefined}>
                {content}
            </AppLink>
        );
    }

    // 버튼
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
