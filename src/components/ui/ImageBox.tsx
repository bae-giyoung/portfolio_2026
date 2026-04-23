'use client';

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type ImageBoxProps = {
    src: StaticImageData | string;
    alt: string;
    className?: string;
    scaleAmount?: number;
    priority?: boolean;
    sizes?: string;
    asLink?: {type: "external" | "internal", src: string, alt: string};
    asButton?: { type: "button", onClick: () => void, alt: string };
};

export default function ImageBox({
    src,
    alt,
    className = "",
    scaleAmount = 1.1,
    priority = false,
    sizes = "100vw",
    asLink,
    asButton,
}: ImageBoxProps) {

    const sharedClass = `group relative block w-full overflow-hidden aspect-video ${className}`;

    const imageContent = (
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform group-hover:scale-(--img-scale)"
            style={{ "--img-scale": scaleAmount } as React.CSSProperties}
        />
    );

    if (asLink?.type === "internal") {
        return (
            <Link href={asLink.src} aria-label={asLink.alt || alt} className={sharedClass}>
                {imageContent}
            </Link>
        );
    }

    if (asLink?.type === "external") {
        return (
            <a href={asLink.src} rel="noopener noreferrer" target="_blank" aria-label={asLink.alt || alt} className={sharedClass}>
                {imageContent}
            </a>
        );
    }

    if (asButton) {
        return (
            <button type="button" onClick={asButton.onClick} aria-label={asButton.alt || alt} className={sharedClass}>
                {imageContent}
            </button>
        );
    }

    return (
        <div aria-label={alt} className={sharedClass}>
            {imageContent}
        </div>
    );
}