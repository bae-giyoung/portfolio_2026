import Link from "next/link";
import { LinkType } from "@/datas/menuConfig";
import SlideUpText from "../ui/text/SlideUpText";

type LinkListProps = {
	linkList: LinkType[];
	listClassName?: string;
	className?: string;
};

export default function LinkList({
	linkList,
	listClassName,
	className,
}: LinkListProps) {
	if (!linkList) return null;

	return (
		<ul className={listClassName}>
			{linkList.map(({ name, href }, i) => (
				<li key={name + i} className={className}>
					<Link
						href={href}
						target={href.includes("http") ? "_blank" : undefined}
						rel={href.includes("http") ? "noopener noreferrer" : undefined}
						className="inline-block w-full h-full group"
					>
						<SlideUpText slideUpSpeed={300}>
							{name}
						</SlideUpText>
					</Link>
				</li>
			))}
		</ul>
	);
}
