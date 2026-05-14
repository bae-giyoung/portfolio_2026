export default function OrderedList01({
    items,
    className,
}: {
    items: string[];
    className?: string;
}) {
    return (
        <ol className={`flex flex-col gap-3 ${className}`}>
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-4 text-[15px] leading-relaxed text-app-fg"
                >
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-app-fg/8 text-xs font-bold text-app-fg/50 mt-0.5">
                        {i + 1}
                    </span>
                    <span className="break-keep">{item}</span>
                </li>
            ))}
        </ol>
    );
}