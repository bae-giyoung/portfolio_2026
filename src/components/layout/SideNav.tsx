"use client";

import NaviButton from "../ui/NaviButton";
import LinkList from "./LinkList";
import { LinkType } from "@/datas/menuConfig";
import { useBreakpointClassCleanup } from "@/hooks/useBreakpointClassCleanup";
import { closeMenu, TABLET_BREAKPOINT } from "@/constants/layout";
import SlideUpText from "../ui/text/SlideUpText";

export default function SideNav ({
    menuList,
    linkList
} : {
    menuList: LinkType[],
    linkList: LinkType[]
}) {
    // breakpoint 이상에서 모바일 메뉴 강제 닫기
    useBreakpointClassCleanup(TABLET_BREAKPOINT);

    // 사이드 네비게이션 애니메이션 (오른쪽에서 슬라이드 인/아웃) -> gsap로 구현할지, 아니면 css transition으로 간단히 구현할지 고민 중.
    // gsap로 구현할 경우, 메뉴 버튼(Header.tsx > MenuButton.tsx) 클릭 시 asideRef를 통해 애니메이션을 트리거하는 방식.
    // gsap로 구현할 경우, CurtainIntro 처럼 curved animation 구현 예정.

    if(!menuList) return null;

    return (
        <aside className="lg:hidden fixed in-[.menu-open]:translate-x-0 translate-x-full top-0 right-0 z-20 w-[min(450px,100vw)] h-screen tracking-wider transition-all duration-500 overflow-hidden">
            <div className="w-full h-full flex flex-col justify-between ml-5 px-10 pt-25 sm:pt-30 pb-10 bg-app-bg text-app-fg rounded-l-4xl border border-app-fg">
                <ul className="flex flex-col items-start gap-10 text-3xl font-bold">
                    {
                        menuList.map((item, i) => (
                            <li key={item.name + i} className="relative" onClick={closeMenu}>
                                <NaviButton targetId={item.href} className="group">
                                    <SlideUpText slideUpSpeed={300}>
                                        {item.name}
                                    </SlideUpText>
                                    <span className="text-app-primary text-[14px] ml-2">{i > 8 ? '' : '0'}{i + 1}</span>
                                </NaviButton>
                            </li>
                        ))
                    }
                </ul>
                <LinkList
                    linkList={linkList}
                    listClassName="flex gap-6 font-noto"
                    className="border border-app-fg rounded-4xl px-4 py-1 font-bold hover:-translate-y-1 transition-transform duration-300"
                />
            </div>
        </aside>
    );
}
