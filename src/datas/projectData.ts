/**
 *
 * [포트폴리오 프로젝트 데이터]
 *
 * 구조:
 * - projectDetails: 단일 소스 (모든 프로젝트 데이터)
 * - projects: projectDetails에서 파생 (카드/목록 컴포넌트용)
 * - projectCards: projectDetails에서 파생 (간단 카드용)
 */

export type ProjectStatus = "Completed" | "InProgress";

export type ProjectRoleCategory = "Frontend" | "Backend" | "FullStack";

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
    }[];
    architecture: {
        before: string;
        after: string;
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
        image: "/src/assets/project-mulalim.webp",
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
            "Data/AI 경진대회 본선 진출 팀 프로젝트로, 공모전 기반 실수요 과제인 수자원 관리·예측 문제를 웹 대시보드 서비스로 구현했습니다.",

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
            "관측소별 지하수위 현황 조회",
            "장기 수위 추세 시각화",
            "AI 예측 결과 차트 표시",
            "기상 데이터와 지하수위 관계 시각화",
            "대시보드 테이블 및 차트 UI",
        ],

        technicalChallenges: [
            {
                title: "여러 데이터 소스의 화면 표현 구조 정리",
                problem:
                    "지하수 관측 데이터, 기상 데이터, AI 예측 결과가 서로 다른 형태로 제공되어 화면에서 일관된 구조로 표현하기 어려웠습니다.",
                solution:
                    "Next.js API Route와 클라이언트 데이터 타입을 기준으로 화면에 필요한 응답 구조를 정리하고, 차트와 테이블 컴포넌트가 재사용 가능한 형태로 데이터를 소비하도록 구성했습니다.",
                result:
                    "관측소별 수위, 예측 결과, 기상 데이터를 대시보드에서 통합적으로 확인할 수 있는 MVP를 구현했습니다.",
            },
            {
                title: "예측 서버와 프론트엔드 연동",
                problem:
                    "FastAPI 예측 서버는 모델 추론 결과를 반환하지만, 프론트엔드에서는 차트와 테이블에 맞는 데이터 구조가 필요했습니다.",
                solution:
                    "예측 결과의 timestamp, predicted value, latest value 등을 화면에서 사용하기 좋은 구조로 변환해 시각화 흐름을 구성했습니다.",
                result:
                    "AI 예측 결과를 사용자가 확인 가능한 대시보드 UI로 연결했습니다.",
            },
        ],

        architecture: {
            before:
                "공공 데이터와 AI 예측 결과가 각각 분리되어 있어 사용자가 직접 데이터 흐름을 이해하기 어려운 상태",
            after:
                "Next.js 대시보드에서 관측 데이터, 예측 결과, 기상 데이터를 통합적으로 조회하고 시각화하는 구조",
        },

        techStack: {
            frontend: ["Next.js", "React", "TypeScript", "Jotai", "Highcharts"],
            backend: ["Spring Boot"],
            dataAi: ["FastAPI", "PyTorch", "LSTM", "Transformer"],
            database: ["MySQL"],
            tools: ["GitHub", "Figma", "Notion"],
        },

        links: {
            github: "https://github.com/bae-giyoung/groundwater-nextjs",
            demo: "https://www.awesomescreenshot.com/video/46379582?key=841a26872d250d5c3c5fcddca08a67d5",
            docs: "/docs/mulalim/project-report-v1.docx",
        },
    },

    {
        id: 2,
        title: "물알림단 풀스택 아키텍처 고도화",
        subTitle: "Spring Boot 중심 데이터 허브 및 API Gateway 구조 개선",
        category: "Full-stack Refactoring",
        image: "/src/assets/project-mulalim-refactoring.webp",
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
            before:
                "웹 클라이언트 → Next.js BFF → 외부 Open API/FastAPI 호출 → Next.js 메모리 가공 → 웹 클라이언트 응답",
            after:
                "Spring Boot Scheduler → Open API 수집 → MySQL 적재 → Spring Boot QueryService/API 응답 → Next.js 렌더링",
        },

        techStack: {
            frontend: ["Next.js", "React", "TypeScript"],
            backend: ["Java 17", "Spring Boot", "Spring Data JPA"],
            dataAi: ["FastAPI", "PyTorch"],
            database: ["MySQL"],
            tools: ["JUnit 5", "Mockito", "GitHub", "Notion"],
        },

        links: {
            github: "",
            demo: "",
            docs: "",
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