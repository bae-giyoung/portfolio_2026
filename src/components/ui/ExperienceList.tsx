'use client';

export type ExperienceListItem = {
    title: string;
    desc?: string;
    period: string;
}

interface ExperienceListProps {
    type?: "ui-1" | "ui-2";
    items: ExperienceListItem[],
    className?: string
}

export default function ExperienceList({
    type = "ui-1",
    items,
    className = "",
} : ExperienceListProps) {

    if (!items || items.length === 0) return null;

    const listNodes = type === "ui-1"
        ? (
            items.map(({title, period}, i) => {
                return (
                    <li key={i} className="flex flex-col lg:flex-row items-start 2xl:gap-10 mb-3 xl:mb-6 last:mb-0">
                        <span className="block w-auto lg:w-40 text-[14px] lg:text-[16px] 2xl:text-lg text-current/70 shrink-0">{period}</span>
                        <span className="relative block font-bold text-[16px] 2xl:text-lg">
                            {title}
                        </span>
                    </li>
                );
            })
        )
        : (
            items.map(({title, desc, period}, i) => {
                return (
                    <li key={i} className="mb-4 md:mb-6">
                        <span className="block font-bold text-lg mb-1">{title}</span>
                        {desc && <span className="block text-[15px] text-current/80 mb-1">{desc}</span>}
                        <span className="block text-xs text-current/80">{period}</span>
                    </li>
                );
            })
        );

    return (
        <ul className={className}>
            {listNodes}
        </ul>
    );
}