import { type CarouselSlide } from "@/components/ui/CarouselSlider";
import profile01 from "@/assets/profile_01.webp";
import profile02 from "@/assets/profile_02.webp";
import profile03 from "@/assets/profile_03.webp";

export const profileSlides: CarouselSlide[] = [
    { src: profile01, alt: "프로필 사진 1", title: "FrontEnd Developer" },
    { src: profile02, alt: "프로필 사진 2", title: "Coffee Addict" },
    { src: profile03, alt: "프로필 사진 3", title: "Pressure-Proof" },
];

export const skillSet = [
    "Javascript",
    "Typescript",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "MySQL",
    "Python",
];

export const relevantExperience = [
    { title: "주식회사 아리모아 웹 퍼블리셔 실무", period: "2023.11. - 2025.04." },
    { title: "부산대학교 주관 『AI 데이터 분석 풀스택 웹 개발자 양성과정』 수료", period: "2025.05. - 2025.11." },
    { title: "풀스택 프로젝트 고도화 및 리팩토링", period: "2026.02. - 현재" }
];

export const allExperience = [
    { title: "부산대학교", desc: "대학교(학사) | 의류학과", period: "2009.03. - 2014.02." },
    { title: "삼성물산 신입 패션전문직 공채과정 인턴", period: "2015.01. - 2015.01." },
    { title: "(주)씨엔엘 의류디자이너", desc: "대리 | 6년차", period: "2017.02. - 2022.12." },
    { title: "주식회사 아리모아 웹 퍼블리셔", desc: "주임 | 2년차", period: "2023.11. - 2025.04." },
    { title: "부산대학교 주관 『AI 데이터 분석 풀스택 웹 개발자 양성과정』 수료", period: "2025.05. - 2025.11." },
];

export const education = [
    { title: "부산대학교", desc: "대학교(학사) | 의류학과", period: "2009.03. - 2014.02." },
    { title: "부산대학교 주관 『AI 데이터 분석 풀스택 웹 개발자 양성과정』 수료", period: "2025.05. - 2025.11." }
];

export const workExperience = [
    { title: "주식회사 아리모아 웹 퍼블리셔", desc: "주임 | 2년차", period: "2023.11. - 2025.04." },
    { title: "(주)씨엔엘 의류디자이너", desc: "대리 | 6년차", period: "2017.02. - 2022.12." },
    { title: "삼성물산 신입 패션전문직 공채과정 인턴", period: "2015.01. - 2015.01." }
];
