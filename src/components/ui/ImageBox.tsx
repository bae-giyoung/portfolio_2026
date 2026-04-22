'use client';

import Image, { type StaticImageData } from "next/image";

type ImageBoxProps = {
    src: StaticImageData | string;
    alt: string;
    className?: string;
    scaleAmount?: number;
    priority?: boolean;
    sizes?: string;
};

export default function ImageBox({
    src,
    alt,
    className = "",
    scaleAmount = 1.1,
    priority = false,
    sizes = "100vw",
}: ImageBoxProps) {
    return (
        <div
            className={`group relative w-full overflow-hidden aspect-video ${className}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform group-hover:scale-(--img-scale)"
                style={{ "--img-scale": scaleAmount } as React.CSSProperties}
            />
        </div>
    );
}
