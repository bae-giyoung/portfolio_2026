"use client";

import Nav from "./Nav";
import MenuButton from "./MenuButton";
import SideNav from "./SideNav";
import { menuList, subMenuList, externalLinkList } from "@/datas/menuConfig";
import ThemeToggleButton from "./ThemeToggleButton";
import LinkList from "./LinkList";
import ScrolledHeader from "../effects/ScrolledHeader";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Logo from "./Logo";

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
			{/* 모바일: 사이드 네비게이션 */}
			<SideNav menuList={[...menuList, ...subMenuList]} linkList={externalLinkList} />

			{/* 모바일: 메뉴 토글 버튼 */}
			<MenuButton className="block lg:hidden absolute right-5 md:right-7.5 top-4.5 sm:5.75 text-[16px] in-[.menu-open]:text-app-bg sm:text-lg font-medium transition-colors duration-300 z-30 cursor-pointer" />
			
			{/* 헤더 */}
			<header id="header" className="relative w-full h-full flex justify-center text-lg">
				<div id="inner-header" className="w-full max-w-441.5 flex items-start justify-between pt-2.5">

					{/* 로고 */}
					<Logo />

					<div className="flex gap-6 sm:gap-8 items-center justify-between pr-20 sm:pr-22 lg:pr-0 shrink-0">
						{/* 외부 링크: GitHub, Notion */}
						<LinkList linkList={externalLinkList} listClassName="hidden lg:flex gap-6 sm:gap-8 items-center justify-between shrink-0" />
						{/* 테마 토글 버튼 */}
						<ThemeToggleButton />
					</div>

					{/* 내비게이션 메뉴 */}
					<div className="flex gap-6 sm:gap-8 items-center justify-between pr-20 sm:pr-22 lg:pr-0 shrink-0">
						<Nav menuList={[...menuList, ...subMenuList]} />
					</div>
				</div>
			</header>
		</div>
		<ScrolledHeader />
	</>
  );
}