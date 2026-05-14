export default function UnorderedList02({
    items,
    className,
    color = "primary",
}: {
    items: string[];
    className?: string;
    color?: "primary" | "foreground" | "background";
}) {
    return (
        <ul className={`flex flex-col gap-3 ${className}`}>
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-app-fg"
                >
                    <span
                        className={`mt-2.25 w-1.5 h-1.5 rounded-full shrink-0 ${color === "primary" ? "bg-app-primary" : color === "foreground" ? "bg-app-fg/40" : "bg-app-bg/70"}`}
                        aria-hidden="true"
                    />
                    <span className="break-keep">{item}</span>
                </li>
            ))}
        </ul>
    );
}