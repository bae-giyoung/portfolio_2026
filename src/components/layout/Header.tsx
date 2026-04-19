"use client";

import Nav from "./Nav";
import MenuButton from "../ui/MenuButton";
import NavigButton from "../ui/NaviButton";
import SideNav from "./SideNav";
import { menuList, sideLinkList } from "@/datas/menuConfig";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import LinkList from "./LinkList";

export default function Header({
	headerRef
}: {
	headerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
	<>
		<div id="header-wrap" className="fixed w-full h-22.5 lg:h-30 font-inst bg-app-bg text-app-fg z-10">
			<SideNav menuList={menuList} linkList={sideLinkList} />
			<MenuButton className="block lg:hidden absolute right-3 top-8.75 sm:top-8 text-[16px] sm:text-xl font-medium z-30 cursor-pointer" />
			<header id="header" ref={headerRef} className="relative w-full h-full flex justify-center px-5 md:px-7.5 py-3">
				<div id="inner-header" className="w-full max-w-465 flex items-center justify-between">
					<NavigButton targetId={"main"} className="static lg:absolute left-1/2 lg:-translate-x-1/2 top-1/2 lg:-translate-y-1/2">
						<div id="logo">
							<h1 className="font-serif text-left lg:text-center text-[26px] lg:text-[40px] leading-none">
								<span className="inline-block lg:block mr-4">Gi Young</span>
                                <span className="inline-block lg:block">Bae</span>
							</h1>
						</div>
					</NavigButton>
                    <LinkList linkList={sideLinkList} listClassName="hidden lg:flex gap-6 sm:gap-8 text-xl items-center justify-between shrink-0" />
					<div className="flex gap-6 sm:gap-8 items-center justify-between pr-18 sm:pr-22 lg:pr-0 shrink-0">
						<ThemeToggleButton />
						<Nav menuList={menuList} />
					</div>
				</div>
			</header>
		</div>
	</>
  );
}