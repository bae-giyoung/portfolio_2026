export default function UnorderedList01({
    items,
    className,
    color = "primary",
}: {
    items: string[];
    className?: string;
    color?: "primary" | "foreground" | "background";
}) {
    return (
        <ul className={`flex flex-col gap-2.5 ${className}`}>
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-2.5 text-[15px] leading-relaxed"
                >
                    <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${color === "primary" ? "bg-app-primary" : color === "foreground" ? "bg-app-fg/40" : "bg-app-bg/70"} shrink-0`}
                        aria-hidden="true"
                    />
                    {item}
                </li>
            ))}
        </ul>
    );
}