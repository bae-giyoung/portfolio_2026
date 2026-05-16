# 프론트엔드 개발자 포트폴리오

> 기술 스택, 프로젝트 경험, 개발 역량을 소개하는 **개인 포트폴리오** 웹사이트입니다.  
> Next.js App Router 기반으로 GSAP 애니메이션, 부드러운 스크롤, 다크/라이트 테마 등을 구현했습니다.

---

## 📌 Notes

- 1인 개발 · 디자인 일원화 프로젝트입니다.
- `/lab` 경로는 별도 UI 실험실 서비스로 `rewrites` 프록시를 통해 연결됩니다. (환경변수 필요)

---

## 📖 목차

- [개요](#-개요-overview)
- [성과](#-성과-impact)
- [기술 스택](#-기술-스택-tech-stack)
- [프로젝트 구조](#-프로젝트-구조-project-structure)
- [기술적 도전](#-기술적-도전-technical-challenges)
- [Setup & Run](#-getting-started)

---

## 🧩 개요 (Overview)

> 개인 포트폴리오 웹사이트 구축 (1인 프로젝트)<br />
> 기간: 2026.04 ~ 2026.05<br />
> 역할: 기획 · 디자인 · 프론트엔드 개발 전담<br />
> 기술: Next.js · TypeScript · Tailwind CSS · GSAP · Framer Motion · Lenis · Jotai<br />

#### 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 홈 - MainVisual · ProfileSection · ProjectSection · WorkSection · WorkGallery |
| `/projects/[id]` | 프로젝트 상세 - SSG 정적 생성, 기술적 도전 아코디언, 아키텍처 비교 |
| `/lab/*` | UI 실험실 - 외부 서비스 프록시 |

---

## 🎉 성과 (Impact)

- **이미지 압축 자동화**로 수동 최적화 작업 누락 리스크 감소 및 **유지보수성 개선**
- 이미지 에셋 **10,528 KB → 906 KB** 로 약 **91.4% 용량 절감** 하여 초기 로딩 부담 완화
- GSAP 애니메이션을 height/top 기반에서 transform(scaleY/yPercent) 기반으로 개선하여 **CLS 1.00 → 0.00** 달성
- GitHub-Vercel 연동으로 자동 배포 흐름 구성
- SSG 기반 상세 페이지 사전 생성으로 CDN 중심 정적 응답 구조 구현

---

## 🛠️ 기술 스택 (Tech Stack)

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

## ✨ 기술적 도전 (Technical Challenges)

### 1. 정적 에셋 이미지 빌드 자동화 압축

**문제**
- `next/image`에 src 문자열로 넘기는 `public/` 이미지는 Vercel이 on-demand로 최적화하지만, `import` 방식의 정적 임포트 이미지는 번들에 원본 그대로 포함됨
- 일부 파일이 과도하게 커 초기 로딩 성능에 영향 발생
- 기존 수동 압축(Squoosh) 방식은 파일 추가·수정 시 반복 작업이 필요하고 누락 위험이 있었음

**해결**
- `npm prebuild` 훅에 `sharp` 기반 이미지 최적화 스크립트를 연결해 `npm run build` 실행 시 자동 압축 처리
- 매니페스트 파일로 파일 크기+수정시간 기반 변경 감지 → 미변경 파일 스킵으로 빌드 속도 보존
- `toBuffer()` 방식으로 파일 핸들을 완전히 해제한 뒤 `writeFile` 처리 → Windows 파일 락 문제 해결

```
npm run build
  └─ prebuild: optimize-images.mjs (sharp, quality 78)
       ├─ src/assets/**/*.webp  →  WebP 재압축
       └─ 변경된 파일만 처리 (매니페스트 기반 증분 실행)
```

**결과**
- 전체 에셋 용량 **10,528 KB → 906 KB (약 91.4% 감소)**
- 파일 추가 시 스크립트 수정 없이 자동 처리 → 유지보수 비용 제거

| 파일 | Before | After | 감소율 |
|---|---|---|---|
| profile-02.webp | 2,126 KB | 40.0 KB | 98.1% |
| work-daedong.webp | 1,853 KB | 43.5 KB | 97.7% |
| work-busan-waman.webp | 586 KB | 27.2 KB | 95.4% |
| work-ubi-decision.webp | 842 KB | 45.5 KB | 94.6% |
| profile-03.webp | 1,364 KB | 80.7 KB | 94.1% |

---

### 2. GSAP 커튼 애니메이션 CLS 개선

**문제**
- 커튼 전환 애니메이션에 `height`와 `top` 속성을 직접 변경하는 방식을 사용하자 브라우저가 레이아웃을 재계산하여 CLS(Cumulative Layout Shift)가 **1.0**으로 측정됨

**해결**
- `height` 애니메이션을 `scaleY`로 전환해 레이아웃 재계산 없이 GPU 합성 레이어에서 처리 → CLS 1.0 → 0.4~0.53으로 감소
- `top` 애니메이션을 `yPercent`(transform)로 전환해 레이아웃 영향을 완전히 제거 → CLS 0으로 해소

**결과**
- 커튼 인/아웃 애니메이션 전체를 transform 기반 속성으로 전환하여 **CLS 1.0 → 0** 달성

---

### 3. 동적 라우트 메타데이터 누락 → generateStaticParams SSG 전환으로 해결

**문제**
- 동적 라우트(`/projects/[id]`)를 CSR로 구현하면 초기 HTML에 콘텐츠가 없어 OG 태그·title 등 메타데이터를 크롤러가 수집하지 못함
- 프로젝트 데이터는 빌드 시점에 확정되는 정적 데이터임에도, 런타임마다 서버 처리가 발생하는 구조적 비효율이 존재

**해결**
- `generateStaticParams()`로 `projectDetails` 배열을 순회해 빌드 타임에 `/projects/1` · `/projects/2` · `/projects/3` 정적 경로를 사전 생성
- `generateMetadata()`로 각 프로젝트의 `title` / `description` 메타데이터를 자동 생성해 크롤러 호환성 확보

**결과**
- 상세 페이지가 순수 정적 HTML로 빌드되어 Vercel CDN에서 서버 함수 실행 없이 즉시 응답
- `projectDetails`에 데이터를 추가하는 것만으로 신규 상세 페이지와 메타데이터가 자동 생성 → 배포 외 별도 작업 불필요

---

## 🚀 Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (.env.local)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app   # metadataBase, OG URL 해석에 사용
NEXT_PUBLIC_PRIVATE_PLAY_URL=http://localhost:xxxx   # /lab 경로 프록시 (선택)

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:3000
```
