'use client';

import Image, { type StaticImageData } from "next/image";

export default function Gallery({
    galleryItems
} : {
    galleryItems: { src: StaticImageData; alt: string; className: string }[];
}) {
  return (
    <div
        className="flex gap-10 items-end"
    >
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