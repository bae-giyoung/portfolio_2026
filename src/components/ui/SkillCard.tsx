import Image from "next/image";
import type { SkillItem } from "@/datas/profileDate";

export default function SkillCard({ label, iconKey }: SkillItem) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-3 py-6">
            {/* 아이콘 */}
            <div className="flex h-12 w-12 items-center justify-center">
                {iconKey ? (
                    <Image
                        src={`/icons/skills/${iconKey}.svg`}
                        alt={label}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-12 w-12 object-contain"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-app-primary/20">
                        <span className="text-[13px] font-bold text-app-primary leading-none tracking-tight text-center px-1">
                            {label.slice(0, 4).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* 라벨 */}
            <span className="text-[13px] sm:text-[15px] text-app-fg/80 text-center leading-tight wrap-break-words w-full">
                {label}
            </span>
        </div>
    );
}
