import NavigationButton from "../ui/NaviButton";
import { LinkType } from "@/datas/menuConfig";

export default function Nav ({
	menuList
} : {
	menuList: LinkType[]
}) {

	if(!menuList) return null;

	 return (
	 	<nav className="hidden lg:block">
	 		<ul className="flex items-center justify-center gap-10 text-xl">
	 			{
	 				menuList.map((item, i) => (
	 					<li key={item.name + i}>
	 						<NavigationButton targetId={item.href}><span>{item.name}</span></NavigationButton>
	 					</li>
	 				))
	 			}
	 		</ul>
	 	</nav>
	 );
}