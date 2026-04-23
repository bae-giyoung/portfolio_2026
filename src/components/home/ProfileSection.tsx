"use client";

import CarouselSlider from "@/components/ui/CarouselSlider";
import Badge from "../ui/Badge";
import { education, skillSet, profileSlides, workExperience, relevantExperience, allExperience } from "@/datas/profileDate";
import ExperienceList from "../ui/ExperienceList";
import SectionLayout from "../ui/section/SectionLayout";
import RevealingText from "../ui/text/RevealingText";
import SlideButton from "../ui/SlideButton";

export default function ProfileSection() {
    return (
        <SectionLayout
            sectionId="profile"
            sectionMeta={{ number: "02", category: "about me", label: "profile" }}
        >
            <h2 className="sr-only">Profile</h2>
            
            {/* 프로필 컨텐츠 */}
            <div id="profile-contents" className="w-full flex flex-col lg:flex-row-reverse gap-8 lg:gap-0 justify-between items-center lg:items-center pt-32 -mt-18">
                {/* 프로필 슬라이더 */}
                <div className="w-[min(100%,20rem)] xl:w-120 mt-0 lg:mt-4 shrink-0">
                    <CarouselSlider slides={profileSlides} interval={8000} />
                </div>

                {/* 프로필 정보 */}
                <div className="w-full lg:w-[calc(100%-24rem)] xl:w-[calc(100%-34rem)] flex flex-col gap-5 xl:gap-10 mt-5 lg:mt-0">
                    {/* About */}
                    <RevealingText>
                        <span className="block text-9xl font-bold font-space text-app-primary">*</span>
                        <p className="text-[28px] sm:text-[34px] lg:text-[36px] 2xl:text-[50px] max-w-172 font-bold text-app-fg leading-[1.2] overflow-hidden mb-8 2xl:mb-12">
                            안녕하세요.
                            <br className="hidden 2xl:block" />문제 해결과 성장을 즐기는 
                            <br className="hidden 2xl:block" /> 프론트엔드 개발자 배기영입니다.
                        </p>
                    </RevealingText>
                    <p className="text-[15px] lg:text-[17px] xl:text-lg 2xl:text-xl leading-relaxed text-current/80">
                        새로운 기술을 배우고, 협업을 통해 더 나은 사용자 경험을 만드는 데 가치를 두고 있습니다.
                        <br />
                        제 포트폴리오를 통해 저의 경험과 역량을 확인해보시고, 함께 멋진 프로젝트를 만들어 나가길 기대합니다!
                    </p>

                    {/* Skills */}
                    <p className="flex gap-2 flex-wrap mb-10 text-current/90">
                        {skillSet.map((skill, index) => (
                            <Badge key={index} text={skill} />
                        ))}
                    </p>

                    {/* 직무 연관 이력 */}
                    <h3 className="text-2xl lg:text-3xl font-bold">Relevant Experience</h3>
                    <ul className="mb-5">
                        <ExperienceList items={relevantExperience} />
                    </ul>

                </div>
            </div>

            {/* 더 보기 버튼 모음 */}
            <div className="flex flex-wrap gap-2">
                <SlideButton as="button">
                    전체 약력 보기
                </SlideButton>

                <SlideButton as="button">
                    역량 및 기술 스택 상세 보기
                </SlideButton>

                <SlideButton as="button">
                    이력서 보기
                </SlideButton>
            </div>
        </SectionLayout>
    );
}