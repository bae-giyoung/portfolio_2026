"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  useLenis(({ scroll }) => {
    ScrollTrigger.update();
    void scroll;
  });
  return null;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    ScrollTrigger.refresh();
  }, []);

  // 터치 기기에서 html의 overflow-y를 auto로 복원 (CSS에서 html { overflow-x: hidden } 유지)
  // body의 overflow-x: hidden은 CSS에서 그대로 유효 → 별도 JS 처리 불필요
  useEffect(() => {
    if (!isTouch) return;
    document.documentElement.style.overflowY = "auto";
  }, [isTouch]);

  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.2,
      stopInertiaOnNavigate: true,
    }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}