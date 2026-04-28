import { type CarouselSlide } from "@/components/ui/CarouselSlider";
import profile01 from "@/assets/character-2.webp";
import profile02 from "@/assets/profile-02.webp";
import profile03 from "@/assets/profile-03.webp";

export type SkillItem = { label: string; iconKey?: string };

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
    { title: "주식회사 아리모아 웹 퍼블리셔", period: "2023.11. - 2025.04." },
    { title: "부산대학교 주관 『AI 데이터 분석 풀스택 웹 개발자 양성과정』 수료", period: "2025.05. - 2025.11." },
    { title: "풀스택 프로젝트 고도화 및 리팩토링", period: "2026.02. - 현재" }
];

export const education = [
    { title: "부산대학교", desc: "대학교(학사) | 의류학과", period: "2009.03. - 2014.02." },
    { title: "더조은 컴퓨터 아카데미 UI/UX 디자이너/웹퍼블리셔 과정 수료", period: "2023.06 - 2023.10" },
    { title: "부산대학교 주관 『AI 데이터 분석 풀스택 웹 개발자 양성과정』 수료", period: "2025.05. - 2025.11." }
];

export const workExperience = [
    { title: "주식회사 아리모아 웹 퍼블리셔", desc: "주임 | 2년차", period: "2023.11. - 2025.04." },
    { title: "(주)씨엔엘 의류디자이너", desc: "대리 | 6년차", period: "2017.02. - 2022.12." },
    { title: "삼성물산 신입 패션전문직 공채과정 인턴", period: "2015.01. - 2015.01." }
];

//* == 스킬 탭 데이터
export const frontendSkillItems: SkillItem[] = [
    { label: "HTML5", iconKey: "html" },
    { label: "CSS3", iconKey: "css" },
    { label: "JavaScript", iconKey: "js" },
    { label: "TypeScript", iconKey: "ts" },
    { label: "React", iconKey: "react" },
    { label: "Next.js", iconKey: "next" },
    { label: "TailwindCSS", iconKey: "tailwind" },
    { label: "jQuery", iconKey: "jquery"   },
    { label: "GSAP" },
    { label: "Swiper" },
    { label: "Highcharts" },
];

export const frontendCaps = [
    "반응형·접근성 기반 UI 구현",
    "상태 관리(Jotai) 및 비동기 데이터 처리",
    "인터랙션 중심 UI/UX 설계 및 구현",
    "TypeScript 기반 데이터 구조 정의 및 컴포넌트 안정성 개선",
    "실행 컨텍스트·클로저 등 JavaScript 핵심 동작 원리 기반 코드 설계",
    "Vanilla JS 기반 DOM 제어 및 이벤트 처리 가능",
];

export const backendSkillItems: SkillItem[] = [
    { label: "Java",  iconKey: "java" },
    { label: "Spring Boot", iconKey: "spring" },
    { label: "Spring Security" },
    { label: "JSP / Servlet" },
    { label: "MySQL", iconKey: "mysql" },
    { label: "Supabase", iconKey: "supabase" },
];

export const backendCaps = [
    "RESTful API 설계 및 구현",
    "인증·인가(Spring Security) 기반 보안 처리",
    "JPA 기반 데이터 모델링 및 서비스 로직 구현",
];

export const dataAiSkillItems: SkillItem[] = [
    { label: "Python", iconKey: "python" },
    { label: "PyTorch", iconKey: "pytorch" },
    { label: "Scikit-learn", iconKey: "sklearn" },
    { label: "Pandas" },
];

export const dataAiCaps = [
    "Python 기반 데이터 처리 및 분석 코드 이해·수정 가능",
    "데이터 분석 및 시각화 경험",
    "AI 모델 결과를 React 기반 UI로 시각화하는 End-to-End 구현 경험",
];

export const toolsSkillItems: SkillItem[] = [
    { label: "GitHub", iconKey: "github" },
    { label: "VSCode", iconKey: "vscode" },
    { label: "Eclipse", iconKey: "eclipse" },
    { label: "Vercel", iconKey: "vercel" },
    { label: "SVN" },
    { label: "STS" },
];

export const toolsCaps = [
    "Git 기반 협업 및 브랜치 전략 경험",
    "작업 이력 관리 및 협업 프로세스(SVN 포함) 경험",
    "Vercel 기반 배포 및 환경 변수 관리 경험",
];
