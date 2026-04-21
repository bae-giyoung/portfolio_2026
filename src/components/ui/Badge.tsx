interface BadgeProps {
    text: string;
}

export default function Badge ({ 
    text 
}: BadgeProps
) {
    return (
        <span className="inline-block px-4 py-2.5 border border-current/40 rounded-4xl leading-none font-bold">
            {text}
        </span>
    );
};