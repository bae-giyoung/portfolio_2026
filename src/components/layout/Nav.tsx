import NaviButton from "./NaviButton";
import { LinkType } from "@/datas/menuConfig";
import SlideUpText from "../ui/text/SlideUpText";

export default function Nav ({
	menuList,
} : {
	menuList: LinkType[],
}) {

	if(!menuList) return null;

	 return (
	 	<nav className="hidden lg:block">
	 		<ul className="flex items-center justify-center gap-10">
	 			{
	 				menuList.map((item, i) => (
	 					<li key={item.name + i}>
	 						<NaviButton href={item.href} className="group">
								<SlideUpText slideUpSpeed={300} className="">
									{item.name}
								</SlideUpText>
							</NaviButton>
	 					</li>
	 				))
	 			}
	 		</ul>
	 	</nav>
	 );
}