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

  // Lenis 언마운트 이후 overflow 복원 (globals.css에서 html,body에 overflow:hidden 설정됨)
  useEffect(() => {
    if (!isTouch) return;
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
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