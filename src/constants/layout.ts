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
