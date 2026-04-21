'use client';

import { toggleMenu } from "@/constants/layout";

export default function MenuButton({
	className = ""
}: {
	className?: string;
}) {
	return (
		<button type="button" className={className} onClick={toggleMenu}>
            <span className="inline-block mr-1">MENU</span>
            <span className="inline-block">+</span>
        </button>
	);
}