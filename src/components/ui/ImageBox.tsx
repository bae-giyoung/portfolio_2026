'use client';

import Image, { type StaticImageData } from "next/image";
import AppLink from "@/components/layout/AppLink";

type ImageBoxProps = {
    src: StaticImageData | string;
    alt: string;
    className?: string;
    scaleAmount?: number;
    priority?: boolean;
    sizes?: string;
    asLink?: {src: string, alt: string};
    asButton?: { onClick: () => void, alt: string };
    children?: React.ReactNode;
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
    children,
}: ImageBoxProps) {

    const sharedClass = `group relative block w-full overflow-hidden aspect-4/3 ${className}`;

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

    if (asLink) {
        return (
            <AppLink href={asLink.src} aria-label={asLink.alt || alt} className={sharedClass}>
                {imageContent}
                {children}
            </AppLink>
        );
    }

    if (asButton) {
        return (
            <button type="button" onClick={asButton.onClick} aria-label={asButton.alt || alt} className={sharedClass}>
                {imageContent}
                {children}
            </button>
        );
    }

    return (
        <div aria-label={alt} className={sharedClass}>
            {imageContent}
            {children}
        </div>
    );
}