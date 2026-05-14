export type LinkType = {
    name: string,
    href: string,
    type: "main" | "sub" | "sub-hidden" | "external"
}

/**
 * href: 
 * - main: #profile-contents, #projects, #works (메인 페이지 내 섹션 이동, 반드시 #으로 시작)
 * - sub: /lab (헤더에 노출 안함)
 * - sub-hidden: /projects/1, /projects/2 (헤더에 노출)
 * - external: github, notion
 */
export const allMenuList : LinkType[] = [
    {name: "프로필", href: "#profile-contents", type: "main"},
    {name: "프로젝트", href: "#projects", type: "main"},
    {name: "작업", href: "#works", type: "main"},
    
    {name: "UI 실험실", href: "/lab", type: "sub"},
    
    {name: "물알림단", href: "/projects/1", type: "sub-hidden"},
    {name: "물알림단 고도화 프로젝트", href: "/projects/2", type: "sub-hidden"},

    {name: "Github", href: "https://github.com/bae-giyoung", type: "external"},
    /* {name: "Notion", href: "https://github.com/bae-giyoung", type: "external"}, */
]

export const menuList : LinkType[] = allMenuList.filter(menu => menu.type === "main");

export const subMenuList : LinkType[] = allMenuList.filter(menu => menu.type === "sub");

export const subHiddenMenuList : LinkType[] = allMenuList.filter(menu => menu.type === "sub-hidden");

export const externalLinkList : LinkType[] = allMenuList.filter(menu => menu.type === "external");

// 페이지 이동 시 메뉴 이름 반환하는 함수: 미등록 경로는 slug 기반 fallback
export function getRouteLabel(href: string): string {
    if (href === "/") return "Home";

    const found = allMenuList.find((m) => m.href === href);
    if (found) return found.name;

    // fallback 용도
    const last = href.split("/").filter(Boolean).pop() ?? href;
    return last.charAt(0).toUpperCase() + last.slice(1);
}