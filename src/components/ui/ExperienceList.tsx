'use client';

export type ExperienceListItem = {
    title: string;
    period?: string;
}

interface ExperienceListProps {
    items: ExperienceListItem[]
}

export default function ExperienceList({
    items
} : ExperienceListProps) {

    if (!items || items.length === 0) return null;

    return (
        <ul>
            {
                items.map(({title, period}, i) => {
                    // title이 없으면 렌더링하지 않음
                    if (!title) return null;

                    return (
                        <li key={i} className="flex items-start gap-5 md:gap-10 mb-4 md:mb-6">
                            {period && <span className="block w-40 text-lg text-current/80">{period}</span>}
                            <span className="block font-bold text-lg mb-1">
                                {title}
                            </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}