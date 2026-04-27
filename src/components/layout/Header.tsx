"use client";

import Nav from "./Nav";
import MenuButton from "./MenuButton";
import NavigButton from "./NaviButton";
import SideNav from "./SideNav";
import { menuList, externalLinkList } from "@/datas/menuConfig";
import ThemeToggleButton from "./ThemeToggleButton";
import LinkList from "./LinkList";
import ScrolledHeader from "../effects/ScrolledHeader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
	const pathname = usePathname();

	// 사이드 네비게이션이 열려있을 때, 페이지가 변경되면 사이드 네비게이션 닫기
	useEffect(() => {
		const root = document.documentElement;
		if (root.classList.contains("menu-open")) {
			root.classList.remove("menu-open");
		}
	}, [pathname]);

  return (
	<>
		<div id="header-wrap" className="fixed w-full h-(--header-height) px-5 md:px-7.5 lg:px-18 py-3 font-inst text-app-fg z-10">
			<SideNav menuList={menuList} linkList={externalLinkList} />
			<MenuButton className="block lg:hidden absolute right-5 md:right-7.5 top-4.5 sm:5.75 text-[16px] in-[.menu-open]:text-app-bg sm:text-lg font-medium transition-colors duration-300 z-30 cursor-pointer" />
			<header id="header" className="relative w-full h-full flex justify-center text-lg">
				<div id="inner-header" className="w-full max-w-441.5 flex items-start justify-between pt-2.5">
					<NavigButton targetId={"main"} className="static lg:absolute left-1/2 lg:-translate-x-1/2 top-1/2 lg:-translate-y-1/2">
						<div id="logo">
							<h1 className="font-serif text-left lg:text-center text-[26px] lg:text-[40px] leading-none">
								<span className="inline-block lg:block mr-4">Gi Young</span>
                                <span className="inline-block lg:block">Bae</span>
								<span className="sr-only">PortFolio</span>
							</h1>
						</div>
					</NavigButton>
                    <LinkList linkList={externalLinkList} listClassName="hidden lg:flex gap-6 sm:gap-8 items-center justify-between shrink-0" />
					<div className="flex gap-6 sm:gap-8 items-center justify-between pr-20 sm:pr-22 lg:pr-0 shrink-0">
						<ThemeToggleButton />
						<Nav menuList={menuList} />
					</div>
				</div>
			</header>
		</div>
		<ScrolledHeader />
	</>
  );
}