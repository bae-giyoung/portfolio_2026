"use client";

import NaviButton from "../ui/NaviButton";
import LinkList from "./LinkList";
import { LinkType } from "@/datas/menuConfig";
import { useBreakpointClassCleanup } from "@/hooks/useBreakpointClassCleanup";
import { closeMenu, TABLET_BREAKPOINT } from "@/constants/layout";
import SlideUpText from "../ui/text/SlideUpText";

const homeConfig = {
    name: "홈",
    href: "#main"
}

export default function SideNav ({
    menuList,
    linkList
} : {
    menuList: LinkType[],
    linkList: LinkType[]
}) {
    // breakpoint 이상에서 모바일 메뉴 강제 닫기
    useBreakpointClassCleanup(TABLET_BREAKPOINT);

    if(!menuList) return null;

    return (
        <aside className="side-nav lg:hidden fixed top-0 right-0 z-20 w-[min(450px,100vw)] h-screen bg-app-fg text-app-bg tracking-wider">
            <div className="curved-div-wrapper absolute top-0 left-px h-full -translate-x-full pointer-events-none">
                <div className="side-nav-curved curved-div-box relative top-0 h-full overflow-hidden">
                    <div className="curved-div block w-[775%] h-[150%] absolute top-1/2 left-1/2 -translate-x-[6.5%] -translate-y-1/2 rounded-[50%] bg-app-fg" />
                </div>
            </div>

            <div className="side-nav-inner w-full h-full flex flex-col justify-between pl-15 pt-25 sm:pt-30 pb-10 overflow-hidden">
                <ul className="flex flex-col items-start gap-10 text-3xl font-bold">
                    {
                        [homeConfig, ...menuList].map((item, i) => (
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
