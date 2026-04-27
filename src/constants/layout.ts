export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;
export const MENU_OPEN_CLASS = "menu-open";

const root = () => document.documentElement;

export function openMenu() {
  root().classList.add(MENU_OPEN_CLASS);
}

export function closeMenu() {
  root().classList.remove(MENU_OPEN_CLASS);
}

export function toggleMenu() {
  root().classList.toggle(MENU_OPEN_CLASS);
}

// 서브페이지에서 홈으로 돌아갈 때, 홈에서 특정 섹션으로 스크롤하기 위해 세션 스토리지에 저장하는 키
export const SCROLL_AFTER_NAV_KEY = "portfolioScrollAfterNav";