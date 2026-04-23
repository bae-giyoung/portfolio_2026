'use client';

export type ExperienceListItem = {
    title: string;
    period?: string;
}

interface ExperienceListProps {
    items: ExperienceListItem[],
    className?: string
}

export default function ExperienceList({
    items,
    className = "",
} : ExperienceListProps) {

    if (!items || items.length === 0) return null;

    return (
        <ul className={className}>
            {
                items.map(({title, period}, i) => {
                    // title이 없으면 렌더링하지 않음
                    if (!title) return null;

                    return (
                        <li key={i} className="flex flex-col lg:flex-row items-start 2xl:gap-10 mb-3 lg:mb-4 xl:mb-6">
                            {period && <span className="block w-auto lg:w-40 text-[14px] md:text-[16px] 2xl:text-lg text-current/70 shrink-0">{period}</span>}
                            <span className="block font-bold text-[16px] 2xl:text-lg text-current/90">
                                {title}
                            </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}