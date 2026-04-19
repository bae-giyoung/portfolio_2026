import { useEffect } from "react";
import { closeMenu } from "@/constants/layout";

/**
 * 지정 breakpoint 이상에서 모바일 메뉴를 강제 닫음.
 * 모바일 메뉴가 열린 채 데스크탑으로 리사이즈될 때 정리용.
 */
export function useBreakpointClassCleanup(
  breakpoint: number = 1024
) {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        closeMenu();
      }
    };

    // 초기 체크 (이미 breakpoint 이상일 수 있음)
    handleChange(mediaQueryList);

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [breakpoint]);
}
