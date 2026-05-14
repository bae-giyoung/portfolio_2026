/**
 *
 * [포트폴리오 프로젝트 데이터]
 *
 * 구조:
 * - projectDetails: 단일 소스 (모든 프로젝트 데이터)
 * - projects: projectDetails에서 파생 (카드/목록 컴포넌트용)
 * - projectCards: projectDetails에서 파생 (간단 카드용)
 */

import { StaticImageData } from "next/image";

export type ProjectStatus = "Completed" | "InProgress";

export type ProjectRoleCategory = "Frontend" | "Backend" | "FullStack";

export type ArchitecturePanel = {
    /** 패널 상단 Label */
    label?: string;
    /** 패널 부제목 */
    title?: string;
    src?: StaticImageData | string;
    alt?: string;
    description?: string[];
    /** 색상 스타일: default = 흰색, foreground = 전경색 강조, primary = 녹색 강조 */
    variant?: "default" | "foreground" | "primary";
    /** 레이아웃: full = 전체 폭, half = 절반 (기본값) */
    span?: "full" | "half";
};

// == 단일 소스 타입
export type ProjectDetail = {
    id: number;
    title: string;
    subTitle: string;
    category: string;
    image: string;
    keywords: string[];
    /** 카드/목록 UI용 대표 기술 스택 */
    tech: string[];
    overview: {
        summary: string;
        period: string;
        team: string;
        role: string;
        roleCategory: ProjectRoleCategory;
        status: ProjectStatus;
    };
    background: string;
    problem: string;
    solution: string;
    impact: string[];
    responsibilities: string[];
    keyFeatures: string[];
    technicalChallenges: {
        title: string;
        problem: string;
        solution: string;
        result: string;
        image?: string;
    }[];
    architecture: {
        panels: ArchitecturePanel[];
    };
    /** 클라이언트 앱 실행 흐름 (진입 / 전환 / 상세) */
    clientFlow?: {
        panels: ArchitecturePanel[];
    };
    /** 상세 페이지용 카테고리별 기술 스택 */
    techStack: {
        frontend: string[];
        backend: string[];
        dataAi: string[];
        database: string[];
        tools: string[];
    };
    links: {
        github?: string;
        demo?: string;
        docs?: string;
        presentation?: string;
    };
};



// == 파생 타입 (컴포넌트 호환성 유지)

/** 
 * @deprecated projectDetails에서 파생되는 타입. 
 * [직접 편집 금지] 프로젝트 데이터는 projectDetails에서 관리하며, 필요한 형태로 파생해서 사용.
 */
export type Project = {
    id: number;
    title: string;
    subTitle: string;
    category: string;
    roleCategory: ProjectRoleCategory;
    period: string;
    status: ProjectStatus;
    image: string;
    summary: string;
    description: string;
    team: string;
    role: string;
    contribution: string[];
    problem: string;
    solution: string;
    impact: string[];
    keyFeatures: string[];
    tech: string[];
    keywords: string[];
    links: {
        github?: string;
        demo?: string;
        docs?: string;
    };
};

/** 
 * @deprecated projectDetails에서 파생되는 타입. 
 * [직접 편집 금지]
 */
export type ProjectCard = {
    id: number;
    title: string;
    category: string;
    roleCategory: ProjectRoleCategory;
    image: string;
    summary: string;
    role: string;
    tech: string[];
    links: {
        github?: string;
        demo?: string;
    };
};



// == 단일 소스 데이터
export const projectDetails: ProjectDetail[] = [
    {
        id: 1,
        title: "물알림단",
        subTitle: "AI 기반 지하수위 예측 대시보드",
        category: "AI Data Dashboard",
        image: "/src/assets/projects/project-mulalim.webp",
        keywords: [
            "AI Prediction",
            "Groundwater",
            "Dashboard",
            "Data Visualization",
            "Next.js BFF",
            "FastAPI",
        ],
        tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Jotai",
            "Highcharts",
            "Tailwind CSS",
            "Spring Boot",
            "MySQL",
            "FastAPI",
            "PyTorch",
        ],
        overview: {
            summary:
                "Data/AI 경진대회 본선 진출작으로, 공공 지하수 관측 데이터와 AI 예측 결과를 시각화한 지하수위 예측 웹 대시보드입니다.",
            period: "2025.09 - 2025.11",
            team: "팀 프로젝트",
            role: "프론트엔드 개발 및 팀 리드 / 대시보드 UI & 데이터 시각화",
            roleCategory: "Frontend",
            status: "Completed",
        },

        background:
            "Data/AI 경진대회 팀 프로젝트로, 공모전 기반 실수요 과제인 수자원 관리·예측 문제를 웹 대시보드 서비스로 구현했습니다.",

        problem:
            "지하수 관측 데이터와 AI 예측 결과는 시계열·관측소·기상 변수 등 여러 축으로 나뉘어 있어, 사용자가 원본 데이터만으로 현재 상태와 예측 흐름을 파악하기 어려웠습니다. 또한 초기 구조에서는 Next.js가 화면 렌더링뿐 아니라 외부 API 호출, 데이터 가공, FastAPI 연동까지 담당하면서 프론트엔드 계층의 책임이 커졌습니다.",

        solution:
            "관측소별 수위 변화, 예측 결과, 기상 변수 관계를 대시보드 형태로 분리해 표현하고, Next.js API Route를 활용해 프론트엔드에서 필요한 응답 구조로 데이터를 가공했습니다. 이를 통해 사용자는 여러 데이터 소스를 직접 해석하지 않고도 차트와 테이블을 통해 지하수위 현황과 예측 흐름을 확인할 수 있도록 했습니다.",

        impact: [
            "Data/AI 경진대회 본선 진출 성과 달성",
            "공공 데이터와 AI 예측 결과를 하나의 대시보드에서 확인할 수 있는 MVP 구현",
            "관측소별 수위 추이, 예측 결과, 기상 데이터의 시각적 비교 가능",
            "팀 프로젝트 내에서 프론트엔드 중심의 화면 구조와 데이터 표현 방식 정리",
            "이후 Spring Boot 중심 리팩토링이 필요한 구조적 한계와 개선 방향 도출",
        ],

        responsibilities: [
            "Next.js 기반 대시보드 화면 구현",
            "관측소별 수위 데이터와 예측 결과 시각화",
            "FastAPI 예측 서버 응답을 화면 데이터 구조에 맞게 연동",
            "차트, 테이블, 상태 UI 구성",
            "팀 내 API 응답 구조와 화면 요구사항 조율",
        ],

        keyFeatures: [
            "회원가입 및 로그인 기능 구현",
            "Session 기반 인증 처리 및 로그인 상태 유지",
            "관측소별 지하수위 현황 조회",
            "장기 수위 추세 시각화",
            "AI 예측 결과 차트 표시",
            "기상 데이터와 지하수위 관계 시각화",
            "대시보드 테이블 및 차트 UI",
        ],

        technicalChallenges: [
            {
                title: "다중 서버 환경에서의 CORS 및 세션 쿠키 전달 문제",
                problem:
                    "Next.js, Spring Boot, FastAPI가 서로 다른 Origin에서 동작하면서 브라우저가 Cross-Origin 요청으로 판단해 CORS 에러가 발생했고, 세션 쿠키(JSESSIONID)도 정상적으로 전달되지 않았습니다.",
                solution:
                    "SameSite=None/Secure, Nginx Reverse Proxy 등 여러 방법을 검토한 뒤, 개발 환경에서 즉시 대응 가능한 Next.js rewrites 프록시를 최종 선택했습니다. 프론트 서버를 중계 서버로 활용해 모든 요청이 동일 Origin으로 처리되도록 구성했습니다.",
                result:
                    "CORS 문제가 해결되었고, JSESSIONID HttpOnly 쿠키가 프론트 서버 도메인으로 저장되어 이후 인증 요청 시 백엔드로 정상 전달되었습니다.",
                image: "/docs/mulalim/trouble-shooting-cors-session.webp",
            },
            {
                title: "로그인 상태 유지 시 초기 UI 깜빡임 문제",
                problem:
                    "페이지 로딩 시 인증 상태가 비동기적으로 확인되면서, 로그인된 사용자에게도 잠시 로그아웃 상태 UI가 표시되었다가 전환되는 깜빡임이 발생했습니다.",
                solution:
                    "LocalStorage 직접 사용(보안 취약), React Context(전역 리렌더링 비효율) 등을 검토한 뒤, Jotai atomWithStorage로 localStorage에 세션 상태를 저장·복원하고 AuthProvider에서 페이지 로드·전환 시마다 세션을 재검증하는 방식을 채택했습니다.",
                result:
                    "인증 상태 확인 전 UI 깜빡임이 제거되었고, CSR 환경에서도 로그인 상태가 부드럽게 유지되었습니다. 인증/비인증 상태에 따른 조건부 렌더링과 페이지 보호 로직도 단순화되었습니다.",
            },
            {
                title: "Open API 간헐적 502 오류로 인한 전체 데이터 요청 중단",
                problem:
                    "Next.js 서버에서 여러 관측소의 Open API를 병렬 호출할 때, 일부 관측소에서 간헐적으로 502 Bad Gateway 오류가 발생하면서 전체 데이터 요청이 중단되었습니다.",
                solution:
                    "Promise.all() 대신 Promise.allSettled()를 적용하여 일부 요청이 실패해도 나머지 관측소 데이터는 정상 수집되도록 구성하고, fulfilled/rejected 결과를 분리해 부분 성공 처리 구조를 구현했습니다.",
                result:
                    "API 요청 안정성이 개선되었고, 실패한 관측소만 예외 처리하여 나머지 데이터는 정상적으로 대시보드에 표시할 수 있게 되었습니다.",
                image: "/docs/mulalim/trouble-shooting-open-api-error.webp",
            },
        ],

        architecture: {
            panels: [
                {
                    span: "full",
                    src: "/docs/mulalim/architecture.webp",
                    alt: "물알림단 아키텍처 다이어그램",
                    description: [
                        "Next.js (Front Server): API 프록시 및 Open API 데이터 가공 담당",
                        "Spring Boot (Back Server): MySQL 연동 RESTful API 제공",
                        "FastAPI (AI Model Server): LSTM+Transformer 모델로 예측 결과 반환",
                        "CORS 문제: Next.js rewrites 프록시로 Origin 통일 해결",
                    ],
                },
            ],
        },

        techStack: {
            frontend: ["Next.js 15.5.9", "React 19.1.2", "TypeScript", "Jotai", "Highcharts"],
            backend: ["Spring Boot 3.5.4", "Java 17", "Spring Data JPA", "Spring Security"],
            dataAi: ["FastAPI", "PyTorch", "LSTM", "Transformer"],
            database: ["MySQL"],
            tools: ["GitHub", "Figma", "Notion"],
        },

        links: {
            github: "https://github.com/bae-giyoung/groundwater-nextjs",
            demo: "https://www.awesomescreenshot.com/video/46379582?key=841a26872d250d5c3c5fcddca08a67d5",
            docs: "/docs/mulalim/project-report-v1.docx",
            presentation: "/docs/mulalim/presentation.pdf",
        },
    },

    {
        id: 2,
        title: "물알림단 풀스택 아키텍처 고도화",
        subTitle: "Spring Boot 중심 데이터 허브 및 API Gateway 구조 개선",
        category: "Full-stack Refactoring",
        image: "/src/assets/projects/project-mulalim-refactoring.webp",
        keywords: [
            "Refactoring",
            "Spring Boot",
            "API Gateway",
            "Data Pipeline",
            "MySQL",
            "Query Service",
            "Time Series",
            "BFF Reduction",
        ],
        tech: [
            "Java 17",
            "Spring Boot",
            "Spring Data JPA",
            "MySQL",
            "JUnit 5",
            "Mockito",
            "Next.js",
            "React",
            "TypeScript",
            "FastAPI",
        ],
        overview: {
            summary:
                "Next.js에 집중되어 있던 데이터 수집·가공 책임을 Spring Boot와 MySQL 중심으로 이관한 구조 개선 프로젝트입니다.",
            period: "2026.02 - 진행 중",
            team: "개인 작업 / 기존 팀 프로젝트 개선",
            role: "백엔드 개선 / API 설계 / 데이터 파이프라인",
            roleCategory: "Backend",
            status: "InProgress",
        },

        background:
            "초기 프로젝트에서는 Next.js BFF가 사용자 요청 시점마다 공공 Open API를 호출하고, 이동평균·전일 대비 증감·상태 계산 등 비즈니스 로직까지 처리했습니다. 이 구조는 API 호출 한도, 응답 지연, 데이터 일관성, 책임 분리 측면에서 운영상 한계가 있었습니다.",

        problem:
            "기존 구조에서는 사용자가 대시보드에 접근할 때마다 Next.js BFF가 외부 Open API를 직접 호출하고, 이동평균·전일 대비 증감·상태 계산 등 비즈니스 로직까지 수행했습니다. 이 구조는 외부 API 호출 한도, 응답 지연, 데이터 일관성, 책임 분리 측면에서 운영 안정성이 낮아질 수 있는 문제가 있었습니다.",

        solution:
            "Spring Boot Scheduler가 외부 Open API 데이터를 주기적으로 수집해 MySQL에 적재하고, Spring Boot QueryService가 DB 기준으로 일 대표 시계열, diff, rolling average, 상태 정보를 조립하도록 구조를 변경했습니다. Next.js는 Spring Boot API 응답을 받아 렌더링하는 역할로 축소했습니다.",

        impact: [
            "Next.js의 역할을 데이터 수집·가공에서 UI 렌더링 중심으로 축소",
            "외부 API 호출 수를 사용자 요청 수에 비례하지 않는 구조로 개선",
            "DB 스냅샷 기준 응답 구조를 통해 데이터 일관성 향상",
            "currentElev API의 조회, 집계, Controller, 테스트, 문서화까지 완료",
            "레거시 학습/검증 데이터 보호를 위한 UPSERT 정책 명확화",
            "KST 도메인 시계열 정책을 명확히 하여 시간 데이터 해석 오류 가능성 감소",
        ],

        responsibilities: [
            "Spring Boot 중심 데이터 파이프라인 고도화 방향 설계",
            "지하수 관측 데이터 DB 스키마 및 JPA Entity 설계",
            "레거시 데이터와 Open API 데이터의 저장/조회 정책 분리",
            "DAILY_MERGED + PREFER_API 조회 정책 구현",
            "currentElev QueryService 및 Controller 구현",
            "WebMvcTest 기반 API 응답 shape 검증",
            "KST 기준 시계열 처리 정책 정리",
            "Next.js BFF 축소 및 Spring Boot API 연동 방향 정리",
        ],

        keyFeatures: [
            "GET /api/v1/dashboard/currentElev API",
            "관측소별 최신 일 대표 수위 조회",
            "최근 N일 테이블 데이터 제공",
            "전일 대비 수위 변화량 제공",
            "1/7/14/30일 평균 수위 제공",
            "최근 10년 같은 월 기준 percentile 상태 판정",
            "레거시 원본 보호 UPSERT 정책",
            "KST 기준 DATETIME + LocalDateTime 처리",
        ],

        technicalChallenges: [
            {
                title: "Next.js BFF 책임 비대화",
                problem:
                    "Next.js API Route가 외부 Open API 호출, 데이터 수집, 통계 가공, 화면 응답 조립까지 담당하면서 프론트엔드 계층의 책임이 과도해졌습니다.",
                solution:
                    "Spring Boot를 데이터 허브로 두고, 수집·저장·조회·집계 책임을 백엔드로 이관했습니다. Next.js는 Spring Boot API 응답을 받아 렌더링하는 역할로 축소했습니다.",
                result:
                    "관심사가 분리되어 프론트엔드는 UI와 사용자 경험에 집중할 수 있는 구조로 개선되었습니다.",
            },
            {
                title: "레거시 데이터와 실시간 API 데이터의 충돌 방지",
                problem:
                    "모델 학습과 검증에 사용한 레거시 데이터는 보존되어야 하지만, 운영 구간에서는 Open API 일자료를 새로 적재해야 했습니다.",
                solution:
                    "groundwater_measurement에는 station_id + measurement_date 유니크 키를 두고, data_source가 같은 경우에만 update를 허용하는 UPSERT 정책을 설계했습니다.",
                result:
                    "레거시 원본 데이터 오염을 방지하면서 API_GIMS_DAILY 데이터는 안전하게 적재할 수 있는 기준을 마련했습니다.",
            },
            {
                title: "일 대표 시계열 조회 정책 설계",
                problem:
                    "레거시 데이터는 시간 단위이고 Open API 데이터는 일 단위이므로, 화면과 통계에서 사용할 하나의 daily 대표 시계열 기준이 필요했습니다.",
                solution:
                    "LEGACY_DAILY_AVG와 API_GIMS_DAILY를 병합하고, 같은 날짜에 둘 다 존재하면 API 데이터를 우선하는 DAILY_MERGED + PREFER_API 정책을 구현했습니다.",
                result:
                    "대시보드, diff, rolling average, status 계산에서 일관된 daily 대표 시계열을 사용할 수 있게 되었습니다.",
            },
            {
                title: "KST 기준 시계열 처리",
                problem:
                    "DB DATETIME, Java LocalDateTime, 외부 API 시간, FastAPI 예측 시간이 섞이면 UTC 변환 여부에 따라 시간 해석 오류가 발생할 수 있었습니다.",
                solution:
                    "프로젝트의 도메인 시계열은 KST 자체가 데이터 의미라는 원칙을 세우고, DB DATETIME과 Java LocalDateTime을 KST 의미로 다루도록 정책을 정리했습니다.",
                result:
                    "도메인 시간과 시스템 시간을 분리해 시계열 조회·적재·응답 기준을 명확히 했습니다.",
            },
        ],

        architecture: {
            panels: [
                {
                    label: "Before",
                    title: "웹 클라이언트 → Next.js BFF → 외부 Open API/FastAPI 호출 → Next.js 메모리 가공 → 웹 클라이언트 응답",
                    variant: "foreground",
                    description: [
                        "사용자 요청 시 Next.js BFF가 외부 Open API를 직접 호출",
                        "이동평균·증감·상태 계산 등 비즈니스 로직을 Next.js 메모리에서 처리",
                        "API 호출 한도 소진, 응답 지연, 데이터 일관성 문제 발생",
                    ],
                },
                {
                    label: "After",
                    variant: "primary",
                    title: "Spring Boot API → 외부 Open API/FastAPI 호출 → DB 적재 → 웹 클라이언트 요청 시 응답",
                    description: [
                        "Spring Boot Scheduler가 Open API 데이터를 주기적으로 MySQL에 적재",
                        "Spring Boot QueryService가 DB 기준으로 시계열·집계 데이터 조립",
                        "Next.js는 Spring Boot API 응답을 받아 렌더링하는 역할로 축소",
                    ],
                },
            ],
        },

        techStack: {
            frontend: ["Next.js 16.2.3", "React 19.2.4", "TypeScript"],
            backend: ["Java 17", "Spring Boot 4.0.2", "Spring Data JPA", "Spring Security"],
            dataAi: ["FastAPI", "PyTorch"],
            database: ["MySQL"],
            tools: ["AWS", "JUnit 5", "Mockito", "GitHub", "Notion"],
        },

        links: {
            github: "",
            demo: "",
            docs: "",
        },
    },

    {
        id: 3,
        title: "포트폴리오",
        subTitle: "프론트엔드 개발자 포트폴리오 웹사이트",
        category: "Portfolio Website",
        image: "/src/assets/projects/project-portfolio.webp",
        keywords: [
            "Next.js",
            "Animation",
            "GSAP",
            "Lenis",
            "Jotai",
            "Responsive",
            "Dark Mode",
        ],
        tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "GSAP",
            "Framer Motion",
            "Lenis",
            "Jotai",
        ],
        overview: {
            summary:
                "프로젝트 경험과 작업물을 소개하는 개인 포트폴리오 웹사이트입니다. 커튼 인트로, 페이지 전환 애니메이션, 드래그 갤러리 등 인터랙티브 요소를 직접 구현했습니다.",
            period: "2026.04 - 2026.05",
            team: "개인 프로젝트",
            role: "기획 / 디자인 / 프론트엔드 개발 전담",
            roleCategory: "Frontend",
            status: "InProgress",
        },

        background:
            "퍼블리셔 경력과 풀스택 과정 이후의 개발 경험을 한 곳에 정리하고, 애니메이션과 인터랙션 구현 역량을 직접 보여줄 수 있는 포트폴리오 사이트가 필요했습니다.",

        problem:
            "단순히 이력을 나열하는 것이 아니라, 사용자가 페이지를 탐색하는 경험 자체가 개발 역량을 보여줄 수 있어야 했습니다. 또한 커튼 인트로·페이지 전환·스크롤 애니메이션처럼 여러 애니메이션 라이브러리가 함께 동작하는 구조에서 상태 충돌과 타이밍 문제를 다뤄야 했습니다.",

        solution:
            "GSAP으로 커튼 인트로와 페이지 전환 애니메이션을 직접 구현하고, Lenis smooth scroll과 GSAP ScrollTrigger를 동기화했습니다. Jotai로 인트로 재생 여부와 테마 상태를 전역 관리하고, Next.js App Router의 정적 생성(SSG)을 활용해 프로젝트 상세 페이지를 빌드 타임에 생성했습니다.",

        impact: [
            "커튼 인트로·페이지 전환·커스텀 커서 등 인터랙티브 요소 직접 구현",
            "다크/라이트 테마, 반응형 레이아웃 대응",
            "Next.js App Router + React Compiler 기반 최신 구조 적용",
            "프로젝트 데이터를 단일 소스(projectDetails)로 관리해 파생 배열 자동 생성",
        ],

        responsibilities: [
            "전체 페이지 기획 및 UI 설계",
            "GSAP 기반 커튼 인트로 애니메이션 구현",
            "GSAP 기반 페이지 전환 애니메이션 및 커스텀 라우터 훅 구현",
            "Lenis smooth scroll + GSAP ScrollTrigger 동기화",
            "다크/라이트 테마 토글 구현",
            "드래그 가능한 마퀴 갤러리(DraggableMarqueeGallery) 구현",
            "프로젝트 상세 페이지 정적 생성(generateStaticParams)",
            "반응형 레이아웃 및 커스텀 커서 구현",
        ],

        keyFeatures: [
            "GSAP SVG 커튼 인트로 애니메이션",
            "GSAP 페이지 전환 애니메이션 (커튼 슬라이드)",
            "Lenis 기반 부드러운 전체 스크롤",
            "다크/라이트 테마 토글",
            "드래그 가능한 마퀴 작업 갤러리",
            "프로젝트 목록 / 상세 페이지",
            "커스텀 커서 (PointerClick / FloatingLabel)",
            "Next.js App Router 정적 사이트 생성(SSG)",
        ],

        technicalChallenges: [
            {
                title: "GSAP 페이지 전환과 Next.js 라우터 연동",
                problem:
                    "Next.js App Router는 router.push() 호출 즉시 페이지를 교체하기 때문에, 전환 커튼이 올라오는 도중 화면이 바뀌거나 반대로 커튼이 내려가기 전에 애니메이션이 종료되는 타이밍 문제가 발생했습니다.",
                solution:
                    "usePageTransition 훅을 직접 구현해 transitionIn(커튼 올림) → router.push() → pathname 변경 감지 → transitionOut(커튼 내림) 순으로 실행되도록 제어했습니다. pathname 변경을 새 페이지 렌더 완료 신호로 활용했습니다.",
                result:
                    "모든 페이지 이동에서 커튼 인/아웃 애니메이션이 끊김 없이 실행되고, 페이지 이름 레이블도 전환 도중 자연스럽게 표시됩니다.",
            },
            {
                title: "Lenis smooth scroll과 GSAP ScrollTrigger 동기화",
                problem:
                    "Lenis가 기본 scroll 이벤트를 가로채 처리하기 때문에, GSAP ScrollTrigger가 스크롤 위치를 제대로 감지하지 못해 트리거 타이밍이 어긋나는 문제가 발생했습니다.",
                solution:
                    "useLenis 훅의 콜백 내에서 ScrollTrigger.update()를 호출하도록 LenisScrollTriggerSync 컴포넌트를 구성해, Lenis 스크롤 이벤트마다 ScrollTrigger가 위치를 재계산하도록 동기화했습니다.",
                result:
                    "부드러운 스크롤 환경에서도 GSAP ScrollTrigger 기반 애니메이션이 올바른 타이밍에 실행됩니다.",
            },
            {
                title: "커튼 인트로 한 번만 재생",
                problem:
                    "SPA 구조에서 페이지를 이동할 때마다 state가 초기화되어 인트로 애니메이션이 반복 재생될 수 있었습니다.",
                solution:
                    "Jotai의 atomWithStorage로 introPlayedAtom을 구성해 세션 내 재생 여부를 유지하고, 인트로 완료 시 플래그를 설정해 이후 방문에서는 렌더링 자체를 건너뛰도록 처리했습니다.",
                result:
                    "첫 방문 시에만 인트로가 재생되고, 같은 세션의 페이지 이동에서는 인트로 없이 바로 콘텐츠가 표시됩니다.",
            },
        ],

        architecture: {
            panels: [
                {
                    span: "full",
                    src: "/docs/portfolio/architecture.webp",
                    alt: "포트폴리오 아키텍처 다이어그램",
                },
                {
                    label: "빌드 & 배포",
                    variant: "foreground",
                    title: "Static-first Deployment on Vercel",
                    description: [
                        "포트폴리오의 프로젝트 데이터는 정적 데이터로 관리하고, Next.js 빌드 시점에 주요 페이지를 사전 생성",
                        "GitHub push/PR을 기준으로 Vercel Preview·Production Deployment 자동화",
                        "generateStaticParams()를 사용해 /projects/[id] 상세 페이지를 빌드 타임에 정적 생성",
                        "정적 HTML/CSS/JS 아티팩트는 Vercel Edge CDN을 통해 전 세계 사용자에게 빠르게 제공",
                    ],
                },
                {
                    label: "요청 & 응답",
                    variant: "primary",
                    title: "Edge CDN 기반 사용자 응답 흐름",
                    description: [
                        "사용자 요청은 Vercel Edge Network로 라우팅되고, 정적 페이지는 서버 함수 실행 없이 CDN에서 즉시 응답",
                        "브라우저는 HTML을 먼저 수신한 뒤 JS 번들을 로드하고 React Hydration을 통해 인터랙션을 활성화",
                        "이미지는 Next.js Image Optimization을 통해 요청 시점에 최적화되며, 최적화 결과는 캐시되어 재사용",
                        "정적 페이지 중심 구조로 초기 응답 속도와 운영 복잡도를 낮춘 배포 구조를 구성",
                    ],
                },
            ],
        },

        clientFlow: {
            panels: [
                {
                    label: "① Entry & Init",
                    span: "full",
                    title: "진입 & 초기화 흐름",
                    description: [
                        "브라우저 요청 → Vercel/CDN에서 SSG 정적 파일 즉시 서빙 (별도 백엔드 없음)",
                        "React Hydration 완료 → ThemeProvider 초기화: localStorage 저장값 확인 → 없으면 prefers-color-scheme 폴백 → html 클래스에 light/dark 적용",
                        "레이아웃 마운트: Header → PointerClickCursor → FloatingLabelCursor → PageTransition → SmoothScrollProvider(Lenis + ScrollTrigger 동기화) 순서로 초기화",
                        "introPlayedAtom 확인 → 최초 방문: CurtainIntro 마운트 → GSAP 인트로 타임라인 실행 → is-loading 클래스로 스크롤 잠금 → 완료 후 atom = true, 언마운트",
                        "재방문 또는 인트로 완료: 홈 콘텐츠 렌더 → MainVisual → ProfileSection → ProjectSection → WorkSection → WorkGallery → Footer",
                    ],
                },
                {
                    label: "② Page Transition",
                    variant: "foreground",
                    title: "페이지 전환 흐름",
                    description: [
                        "링크 클릭 → AppLink가 usePageTransition().navigate(href) 호출",
                        "transitionIn 실행: GSAP 커튼 올라옴 → pointer-events 활성화(클릭 차단) → 페이지명 레이블 fade-in",
                        "Lenis.scrollTo(0, { immediate: true }) → 커튼이 화면을 덮은 직후 최상단으로 즉시 이동",
                        "router.push(href) 실행 → Next.js 라우팅 + 새 페이지 렌더 시작",
                        "pathname 변경 감지(새 페이지 렌더 완료 신호) → transitionOut 실행: GSAP 커튼 내려감 → 새 페이지 노출",
                    ],
                },
                {
                    label: "③ Project Detail",
                    variant: "primary",
                    title: "프로젝트 상세 페이지 흐름",
                    description: [
                        "빌드 타임: generateStaticParams()가 projectDetails 배열을 순회 → /projects/1 · /projects/2 · /projects/3 정적 HTML 생성",
                        "런타임: 브라우저 요청 → CDN에서 정적 파일 즉시 서빙 → React Hydration",
                        "generateMetadata(): id로 projectDetails 조회 → 페이지별 title / description 자동 적용",
                        "상세 컴포넌트 렌더: ProjectDetailHero → ProjectDetailOverview → ProjectDetailSpecs → ProjectDetailArchitecture → ProjectDetailChallenges → 이전/다음 탐색 nav",
                        "projectImageMap(id → StaticImageData)으로 대표 이미지 연결 → next/image priority 최적화 서빙",
                    ],
                },
            ],
        },

        techStack: {
            frontend: ["Next.js 16.2.3", "React 19.2.4", "TypeScript", "Tailwind CSS 4", "GSAP", "Framer Motion", "Lenis", "Jotai"],
            backend: [],
            dataAi: [],
            database: [],
            tools: ["Vercel", "GitHub", "Figma"],
        },

        links: {
            github: "https://github.com/bae-giyoung/portfolio_2026",
            demo: "",
        },
    },
];



// == 파생 배열
export const projects: Project[] = projectDetails.map((d) => ({
    id: d.id,
    title: d.title,
    subTitle: d.subTitle,
    category: d.category,
    roleCategory: d.overview.roleCategory,
    period: d.overview.period,
    status: d.overview.status,
    image: d.image,
    summary: d.overview.summary,
    description: d.background,
    team: d.overview.team,
    role: d.overview.role,
    contribution: d.responsibilities,
    problem: d.problem,
    solution: d.solution,
    impact: d.impact,
    keyFeatures: d.keyFeatures,
    tech: d.tech,
    keywords: d.keywords,
    links: d.links,
}));

export const projectCards: ProjectCard[] = projectDetails.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    roleCategory: d.overview.roleCategory,
    image: d.image,
    summary: d.overview.summary,
    role: d.overview.role,
    tech: d.tech,
    links: {
        github: d.links.github,
        demo: d.links.demo,
    },
}));