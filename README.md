# 배기영 프론트엔드 개발자 포트폴리오

> 기술 스택, 프로젝트 경험, 개발 역량을 소개하는 **개인 포트폴리오** 웹사이트입니다.  
> Next.js App Router 기반으로 GSAP 애니메이션, 부드러운 스크롤, 다크/라이트 테마 등을 구현했습니다.

---

## 📌 Notes

- 1인 개발 · 디자인 일원화 프로젝트입니다.
- `/lab` 경로는 별도 UI 실험실 서비스로 `rewrites` 프록시를 통해 연결됩니다. (환경변수 필요)

---

## 📖 목차

- [개요](#-개요-overview)
- [기술 스택](#-기술-스택-tech-stack)
- [프로젝트 구조](#-프로젝트-구조-project-structure)
- [주요 구현](#-주요-구현-key-implementations)
- [Setup & Run](#-getting-started)

---

## 🧩 개요 (Overview)

> 개인 포트폴리오 웹사이트 구축 (1인 프로젝트)<br />
> 기간: 2025.05 ~<br />
> 역할: 기획 · 디자인 · 개발 전담<br />
> 기술: Next.js · TypeScript · Tailwind CSS · GSAP · Lenis · Jotai<br />

#### 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 홈 — MainVisual · ProfileSection · ProjectSection · WorkSection · WorkGallery |
| `/projects/[id]` | 프로젝트 상세 — SSG 정적 생성, 기술적 도전 아코디언, 아키텍처 비교 |
| `/lab/*` | UI 실험실 — 외부 서비스 프록시 |

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 | 용도 |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 | App Router, SSG, 라우팅 |
| **UI** | React 19 | 컴포넌트 기반 UI |
| **Language** | TypeScript 5 | 타입 안전 코드 |
| **Styling** | Tailwind CSS v4 | 유틸리티 CSS, 다크/라이트 테마 |
| **Animation** | GSAP 3 + @gsap/react | 커튼 인트로, 페이지 전환 애니메이션 |
| **Animation** | Framer Motion | 커서 스프링 애니메이션 |
| **Scroll** | Lenis | 부드러운 스크롤 + GSAP ScrollTrigger 동기화 |
| **State** | Jotai | 전역 상태 (인트로, 테마, 모달, 토스트) |
| **Icons** | Lucide React · React Icons | UI 및 기술 스택 아이콘 |

---

## 📁 프로젝트 구조 (Project Structure)

```text
src/
├── app/
│   ├── layout.tsx              루트 레이아웃 (공통 프로바이더, 헤더, 커서, 모달)
│   ├── page.tsx                홈 페이지
│   └── projects/[id]/page.tsx  프로젝트 상세 (SSG)
├── atoms/
│   └── atoms.ts                Jotai 전역 상태
├── components/
│   ├── effects/                커서 효과, 스크롤 헤더
│   ├── home/                   홈 섹션 컴포넌트
│   ├── layout/                 헤더, 푸터, 네비게이션, 페이지 전환
│   ├── profile/                기술 스택 탭
│   ├── projects/               프로젝트 카드 뷰, 상세 페이지 컴포넌트
│   ├── providers/              ThemeProvider, SmoothScrollProvider
│   └── ui/                     공용 UI 컴포넌트
├── datas/
│   ├── projectData.ts          프로젝트 데이터 싱글 소스
│   ├── workData.ts             작업 리스트 + 갤러리 데이터
│   ├── profileDate.ts          프로필 슬라이드, 직무 연관 이력
│   └── menuConfig.ts           네비게이션 메뉴 구성
└── hooks/                      커스텀 훅
```

---

## ✨ 주요 구현 (Key Implementations)

### 1. GSAP SVG 커튼 인트로 (`CurtainIntro.tsx`)

SVG `<path>`를 `objectBoundingBox` 좌표계(0~1)로 제어하여 리사이즈에 자동 대응하는 곡선 커튼 와이프 인트로를 구현했습니다. `introPlayedAtom`으로 최초 1회만 재생하고 이후 방문 시 스킵합니다.

### 2. GSAP 페이지 전환 (`PageTransition.tsx`)

`PageTransitionContext`와 `usePageTransition()` 훅으로 하위 컴포넌트에서 전환 인식 네비게이션을 사용할 수 있도록 구성했습니다. `transitionIn → router.push → pathname 변경 감지 → transitionOut` 순서로 실행됩니다.

### 3. Lenis + GSAP ScrollTrigger 동기화

`ReactLenis root` 적용 후, `useLenis` 콜백 내에서 매 스크롤 이벤트마다 `ScrollTrigger.update()`를 호출하여 두 라이브러리 간 스크롤 위치 불일치를 방지합니다.

### 4. 프로젝트 데이터 싱글 소스 패턴

`projectDetails[]` (단일 원본) → `projects[]` (카드 목록) 파생 구조로 관리합니다. SSG `generateStaticParams()`도 동일한 배열을 순회하므로 데이터 추가만으로 신규 상세 페이지가 자동 생성됩니다.

---

## 🚀 Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (선택 — /lab 프록시 사용 시)
# .env.local
PRIVATE_PLAY_URL=http://localhost:xxxx

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:3000
```
