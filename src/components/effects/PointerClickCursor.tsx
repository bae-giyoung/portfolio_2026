'use client';

import { useEffect } from "react";

const CLICK_TARGET_SELECTOR = "a, button, .cursor-pointer";
const CLICKED_CLASS = "clicked";

const GRAB_TARGET_SELECTOR = ".cursor-grab";
const GRABBED_CLASS = "grabbed";

export default function PointerClickCursor() {
  useEffect(() => {
    let activeClickEl: Element | null = null;
    let activeGrabEl:  Element | null = null;

    const clearClickEl = () => {
      if (!activeClickEl) return;
      activeClickEl.classList.remove(CLICKED_CLASS);
      activeClickEl = null;
    };

    const clearGrabEl = () => {
      if (!activeGrabEl) return;
      activeGrabEl.classList.remove(GRABBED_CLASS);
      activeGrabEl = null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // 클릭 커서 
      const nextClickEl = target.closest(CLICK_TARGET_SELECTOR);
      if (nextClickEl) {
        if (nextClickEl instanceof HTMLButtonElement && nextClickEl.disabled) {
          // 비활성화된 버튼은 무시
        } else {
          if (activeClickEl && activeClickEl !== nextClickEl) {
            activeClickEl.classList.remove(CLICKED_CLASS);
          }
          activeClickEl = nextClickEl;
          activeClickEl.classList.add(CLICKED_CLASS);
        }
      }

      // 그랩 커서
      const nextGrabEl = target.closest(GRAB_TARGET_SELECTOR);
      if (nextGrabEl) {
        if (activeGrabEl && activeGrabEl !== nextGrabEl) {
          activeGrabEl.classList.remove(GRABBED_CLASS);
        }
        activeGrabEl = nextGrabEl;
        activeGrabEl.classList.add(GRABBED_CLASS);
      }
    };

    const handlePointerUp = () => {
      clearClickEl();
      clearGrabEl();
    };

    document.addEventListener("pointerdown",  handlePointerDown, true);
    document.addEventListener("pointerup",    handlePointerUp,   true);
    document.addEventListener("pointercancel",handlePointerUp,   true);
    window.addEventListener("blur", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown",  handlePointerDown, true);
      document.removeEventListener("pointerup",    handlePointerUp,   true);
      document.removeEventListener("pointercancel",handlePointerUp,   true);
      window.removeEventListener("blur", handlePointerUp);
      clearClickEl();
      clearGrabEl();
    };
  }, []);

  return null;
}

