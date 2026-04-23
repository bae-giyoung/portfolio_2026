'use client';

import { toggleMenu } from "@/constants/layout";
import SlideUpText from "./text/SlideUpText";

export default function MenuButton({
	className = ""
}: {
	className?: string;
}) {
	return (
		<button type="button" className={`group ${className}`} onClick={toggleMenu}>
			<SlideUpText slideUpSpeed={500} className="inline-block w-15 h-10 mr-1 text-center">
				MENU
			</SlideUpText>
			<span className="inline-block in-[.menu-open]:rotate-360 transition-transform duration-600">+</span>
        </button>
	);
}