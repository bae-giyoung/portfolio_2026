import type { Metadata } from "next";
import { Noto_Sans_KR, Urbanist, Instrument_Sans, Space_Grotesk, Instrument_Serif, Hurricane } from "next/font/google";
import "./globals.css";
import Modal from "@/components/ui/Modal";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PointerClickCursor from "@/components/effects/PointerClickCursor";
import Header from "@/components/layout/Header";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const hurricane = Hurricane({
  weight: "400",
  variable: "--font-hurricane",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "배기영 | 프론트엔드",
  description: "안녕하세요! 믿을 수 있는 동료가 되고 싶은 프론트엔드 개발자, 배기영입니다. 이 포트폴리오에서는 저의 기술 스택, 프로젝트 경험, 그리고 개발자로서의 여정을 소개합니다. 함께 성장하고 협력할 수 있는 기회를 기대합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${urbanist.variable} ${instrumentSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${hurricane.variable} antialiased`}
    >
      <body>
        <ThemeProvider>
          <PointerClickCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Modal />
        </ThemeProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
