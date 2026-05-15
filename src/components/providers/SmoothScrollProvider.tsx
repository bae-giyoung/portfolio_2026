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