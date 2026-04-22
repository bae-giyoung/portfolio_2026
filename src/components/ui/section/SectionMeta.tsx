type SectionMetaProps = {
    number: string;
    category: string;
    label: string;
    className?: string;
};

export default function SectionMeta({
    number,
    category,
    label,
    className = "",
}: SectionMetaProps) {
    return (
        <div className={`w-full flex justify-between items-center ${className}`}>
            <span>{number}</span>
            <span>{category}</span>
            <span>{label}</span>
        </div>
    );
}
