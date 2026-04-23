interface BadgeProps {
    text: string;
}

export default function Badge ({ 
    text 
}: BadgeProps
) {
    return (
        <span className="inline-block px-2 md:px-4 py-1.5 md:py-2.5 border border-current/20 dark:bg-app-fg/20 rounded-4xl leading-none font-bold">
            {text}
        </span>
    );
};