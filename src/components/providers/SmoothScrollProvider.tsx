"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
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
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

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