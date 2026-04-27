import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Urbanist, Instrument_Sans, Space_Grotesk, Instrument_Serif, Hurricane } from "next/font/google";
import "./globals.css";
import Modal from "@/components/ui/Modal";
import Toast from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PointerClickCursor from "@/components/effects/PointerClickCursor";
import PageTransition from "@/components/layout/PageTransition";
import Header from "@/components/layout/Header";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  display: "swap",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  display: "swap",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  display: "swap",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  display: "swap",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
  subsets: ["latin"],
});

const hurricane = Hurricane({
  weight: "400",
  variable: "--font-hurricane",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  //metadataBase: new URL("https://"),

  robots: {
    index: true,
    follow: true,
  },

  title: "배기영 | 프론트엔드",
  description: "안녕하세요! 믿을 수 있는 동료가 되고 싶은 프론트엔드 개발자, 배기영입니다. 이 포트폴리오에서는 저의 기술 스택, 프로젝트 경험, 그리고 개발자로서의 여정을 소개합니다. 함께 성장하고 협력할 수 있는 기회를 기대합니다.",
  keywords: ["프론트엔드 개발자", "포트폴리오", "배기영", "웹 개발", "풀스택 개발", "React", "Next.js", "JavaScript", "TypeScript", "MySQL", "Java", "Spring Boot"],
  authors: [{ name: "배기영" }],
  creator: "배기영",
  icons: {
    icon: "src/app/favicon.ico",
  },

  openGraph: {
    title: "배기영 | 프론트엔드 개발자 포트폴리오",
    description: "믿을 수 있는 동료가 되고 싶은 프론트엔드 개발자, 배기영입니다.",
    //url: "https://",
    siteName: "배기영 포트폴리오",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "배기영 포트폴리오 썸네일 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
          <Header />
          <SmoothScrollProvider>
              <PageTransition>
                  {children}
              </PageTransition>
          </SmoothScrollProvider>
          <Modal />
        </ThemeProvider>
        <div id="modal-root"></div>
        <div id="toast-root"></div>
        <Toast />
      </body>
    </html>
  );
}
