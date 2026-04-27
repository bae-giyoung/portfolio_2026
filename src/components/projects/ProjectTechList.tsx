type ProjectTechListProps = {
    tech: string[];
    max?: number;
    className?: string;
};

export default function ProjectTechList({
    tech,
    max,
    className = "",
}: ProjectTechListProps) {
    const visible = max ? tech.slice(0, max) : tech;
    const remaining = max ? tech.length - max : 0;

    return (
        <div className={`flex flex-wrap gap-1.5 ${className}`}>
            {visible.map((t) => (
                <span
                    key={t}
                    className="px-2.5 py-1 text-xs lg:text-[16px] border border-current/20 rounded-full leading-none"
                >
                    {t}
                </span>
            ))}
            {remaining > 0 && (
                <span className="px-2.5 py-1 text-xs lg:text-[16px] border border-current/20 rounded-full leading-none">
                    +{remaining}
                </span>
            )}
        </div>
    );
}
