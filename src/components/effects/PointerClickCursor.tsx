'use client';

import { useEffect } from "react";

const POINTER_TARGET_SELECTOR = "a, button, .cursor-pointer";
const CLICKED_CLASS = "clicked";

export default function PointerClickCursor() {
  useEffect(() => {
    let activeElement: Element | null = null;

    const clearActiveElement = () => {
      if (!activeElement) return;
      activeElement.classList.remove(CLICKED_CLASS);
      activeElement = null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const nextActiveElement = target.closest(POINTER_TARGET_SELECTOR);
      if (!nextActiveElement) return;
      if (nextActiveElement instanceof HTMLButtonElement && nextActiveElement.disabled) return;

      if (activeElement && activeElement !== nextActiveElement) {
        activeElement.classList.remove(CLICKED_CLASS);
      }

      activeElement = nextActiveElement;
      activeElement.classList.add(CLICKED_CLASS);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", clearActiveElement, true);
    document.addEventListener("pointercancel", clearActiveElement, true);
    window.addEventListener("blur", clearActiveElement);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", clearActiveElement, true);
      document.removeEventListener("pointercancel", clearActiveElement, true);
      window.removeEventListener("blur", clearActiveElement);
      clearActiveElement();
    };
  }, []);

  return null;
}
