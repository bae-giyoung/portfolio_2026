export type LinkType = {
    name: string,
    href: string,
    type: "main" | "sub" | "external"
}

export const allMenuList : LinkType[] = [
    {name: "프로필", href: "#profile-contents", type: "main"},
    {name: "프로젝트", href: "#projects", type: "main"},
    {name: "작업", href: "#works", type: "main"},

    {name: "물알림단", href: "/projects/1", type: "sub"},
    {name: "물알림단 고도화 프로젝트", href: "/projects/2", type: "sub"},

    {name: "Github", href: "https://github.com/bae-giyoung", type: "external"},
    {name: "Notion", href: "https://github.com/bae-giyoung", type: "external"},
]

export const menuList : LinkType[] = allMenuList.filter(menu => menu.type === "main");

export const subMenuList : LinkType[] = allMenuList.filter(menu => menu.type === "sub");

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