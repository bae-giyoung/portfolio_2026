'use client';

import Image, { type StaticImageData } from "next/image";

export default function MarqueeGallery({
    galleryItems
} : {
    galleryItems: { src: StaticImageData; alt: string; className: string }[];
}) {
  return (
    <div
        className="flex gap-10 items-end"
        style={{ animation: "marquee 30s linear infinite" }}
    >
        {/* 원본 + 복제: translateX(-50%)에서 이음새 없이 반복 */}
        {[...galleryItems, ...galleryItems].map((item, i) => (
            <div key={i} className={item.className}>
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                />
            </div>
        ))}
    </div>
  );
}