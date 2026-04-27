'use client';

import Link from "next/link";
import { usePageTransition } from "@/components/layout/PageTransition";
import { AnchorHTMLAttributes } from "react";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function AppLink({
    href, children, className, ...props 
} : AppLinkProps
) {
    const navigate = usePageTransition();

    const isExternal = href.startsWith("http://") || href.startsWith("https://");

    if(isExternal) {
        return (
            <a href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...props}
            >
                {children}
            </a>
        )
    }

    return (
        <Link 
            href={href}
            onClick={(e) => {
                // 부모 요소에 onClick이 있다면 허용
                if(props.onClick) props.onClick(e);

                e.preventDefault();
                navigate(href);
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}