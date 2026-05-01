import work1 from "@/assets/works/work-hytrans.webp";
import work2 from "@/assets/works/work-busan-waman.webp";
import work3 from "@/assets/works/work-ubi-decision.webp";
import work4 from "@/assets/works/work-young.webp";
import work5 from "@/assets/works/work-daedong.webp";
import work6 from "@/assets/works/work-kyungbok.webp";
import work7 from "@/assets/works/work-ulsan-univ.webp";

// 영상물등급위원회, 경상대학교, 경인교대는 갤러리에는 넣지 않고, 작업 섹션에서 Archive 버튼 클릭하면 뜨는 모달창 내무에 배치? 
// (공개된 사이트 기준으로만 갤러리 구성하기! - 영상물등급위원회는 퍼블리싱 참여했지만, 사이트가 리뉴얼되어서 현재는 참여한 버전이 아님)

export const workGalleryData = [
    {
        src: work1,
        alt: "현대 트랜시스",
        width: 400,
        height: 267,
        label: "현대 트랜시스",
        link: "https://www.hyundai-transys.com/ko/main.do",
        linkLabel: "사이트 보기",
    },
    {
        src: work2,
        alt: "부산여성가족과 평생교육진흥원",
        width: 400,
        height: 400,
        label: "부산여성가족과 평생교육진흥원",
        link: "https://www.bgli.re.kr/kor/Main.do",
        linkLabel: "사이트 보기",
    },
    {
        src: work3,
        alt: "UBI Decision",
        width: 400,
        height: 267,
        label: "UBI Decision",
        link: "https://www.ubidecision.co.kr",
        linkLabel: "사이트 보기",
    },
    {
        src: work4,
        alt: "영렘브란트",
        width: 400,
        height: 267,
        label: "영렘브란트",
        link: "https://www.yrk88.co.kr",
        linkLabel: "사이트 보기",
    },
    {
        src: work5,
        alt: "대동대학교",
        width: 400,
        height: 400,
        label: "대동대학교",
        link: "https://www.daedong.ac.kr",
        linkLabel: "사이트 보기",
    },
    {
        src: work6,
        alt: "경복대학교",
        width: 400,
        height: 267,
        label: "경복대학교",
        link: "https://www.kbu.ac.kr",
        linkLabel: "사이트 보기",
    },
    {
        src: work7,
        alt: "울산과학대학교",
        width: 400,
        height: 400,
        label: "울산과학대학교",
        link: "https://www.uc.ac.kr",
        linkLabel: "사이트 보기",
    },
];

// export const workGalleryData = [
//     {
//         src: work1,
//         alt: "현대 트랜시스",
//         width: 300,
//         height: 200,
//         label: "현대 트랜시스",
//         link: "https://www.hyundai-transys.com/ko/main.do",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work2,
//         alt: "부산여성가족과 평생교육진흥원",
//         width: 300,
//         height: 361,
//         label: "부산여성가족과 평생교육진흥원",
//         link: "https://www.bgli.re.kr/kor/Main.do",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work3,
//         alt: "UBI Decision",
//         width: 300,
//         height: 200,
//         label: "UBI Decision",
//         link: "https://www.ubidecision.co.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work4,
//         alt: "영렘브란트",
//         width: 300,
//         height: 200,
//         label: "영렘브란트",
//         link: "https://www.yrk88.co.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work5,
//         alt: "대동대학교",
//         width: 300,
//         height: 361,
//         label: "대동대학교",
//         link: "https://www.daedong.ac.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work6,
//         alt: "경복대학교",
//         width: 300,
//         height: 200,
//         label: "경복대학교",
//         link: "https://www.kbu.ac.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work7,
//         alt: "울산과학대학교",
//         width: 300,
//         height: 361,
//         label: "울산과학대학교",
//         link: "https://www.uc.ac.kr",
//         linkLabel: "사이트 보기",
//     },
// ];

// export const workGalleryData = [
//     {
//         src: work1,
//         alt: "현대 트랜시스",
//         width: 600,
//         height: 400,
//         label: "현대 트랜시스",
//         link: "https://www.hyundai-transys.com/ko/main.do",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work2,
//         alt: "부산여성가족과 평생교육진흥원",
//         width: 600,
//         height: 400, // 722
//         label: "부산여성가족과 평생교육진흥원",
//         link: "https://www.bgli.re.kr/kor/Main.do",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work3,
//         alt: "UBI Decision",
//         width: 600,
//         height: 400,
//         label: "UBI Decision",
//         link: "https://www.ubidecision.co.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work4,
//         alt: "영렘브란트",
//         width: 600,
//         height: 400,
//         label: "영렘브란트",
//         link: "https://www.yrk88.co.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work5,
//         alt: "대동대학교",
//         width: 600,
//         height: 400, // 722
//         label: "대동대학교",
//         link: "https://www.daedong.ac.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work6,
//         alt: "경복대학교",
//         width: 600,
//         height: 400,
//         label: "경복대학교",
//         link: "https://www.kbu.ac.kr",
//         linkLabel: "사이트 보기",
//     },
//     {
//         src: work7,
//         alt: "울산과학대학교",
//         width: 600,
//         height: 400, // 722
//         label: "울산과학대학교",
//         link: "https://www.uc.ac.kr",
//         linkLabel: "사이트 보기",
//     },
// ];

