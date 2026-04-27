"use client";

import CarouselSlider from "@/components/ui/CarouselSlider";
import { profileSlides, relevantExperience } from "@/datas/profileDate";
import ExperienceList from "../ui/ExperienceList";
import SectionLayout from "../ui/section/SectionLayout";
import RevealingText from "../ui/text/RevealingText";
import SkillTabs from "../profile/SkillTabs";

export default function ProfileSection() {

    return (
        <SectionLayout
            sectionId="profile"
            sectionMeta={{ number: "02", category: "about me", label: "profile" }}
        >
            <h2 className="sr-only">Profile</h2>
            
            {/* 프로필 컨텐츠 */}
            <div id="profile-contents" className="w-full">
                
                <div className="w-full flex flex-col lg:flex-row-reverse gap-6 lg:gap-0 justify-between items-center lg:items-center pt-32 -mt-18">
                    {/* 프로필 슬라이더 */}
                    <div className="w-[min(100%,20rem)] 2xl:w-120 mt-0 lg:mt-4 shrink-0">
                        <CarouselSlider slides={profileSlides} interval={8000} />
                    </div>

                    {/* 프로필 정보 */}
                    <div className="w-full lg:w-[calc(100%-24rem)] 2xl:w-[calc(100%-34rem)] mt-5 lg:mt-0 mb-16 lg:mb-26">
                        {/* About */}
                        <RevealingText className="mb-6 lg:mb-10 xl:mb-12">
                            <span className="block text-7xl xl:text-8xl 2xl:text-9xl font-bold font-space text-app-primary">*</span>
                            <p className="text-[28px] sm:text-[30px] lg:text-[34px] 2xl:text-[50px] max-w-140 lg:max-w-172 font-bold text-app-fg leading-[1.2] overflow-hidden">
                                안녕하세요.
                                <br className="hidden 2xl:block" />문제 해결과 성장을 즐기는 
                                <br className="hidden 2xl:block" /> 프론트엔드 개발자 배기영입니다.
                            </p>
                        </RevealingText>
                        <p className="text-[15px] lg:text-[17px] xl:text-lg 2xl:text-xl leading-relaxed text-current/80 mb-10 lg:mb-18">
                            새로운 기술을 배우고, 협업을 통해 더 나은 사용자 경험을 만드는 데 가치를 두고 있습니다.
                            <br className="hidden md:block lg:hidden xl:block" />
                            제 포트폴리오를 통해 저의 경험과 역량을 확인해보시고, 함께 멋진 프로젝트를 만들어 나가길 기대합니다!
                        </p>

                        {/* 직무 연관 이력 */}
                        <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-6 text-app-primary">직무 연관 이력</h3>
                        <ul>
                            <ExperienceList type="ui-1" items={relevantExperience} />
                        </ul>

                        {/* 버튼 모음 */}
                        {/* <div className="flex flex-wrap gap-2 md:gap-4 mt-8 lg:mt-10">
                            <SlideButton
                                as="button"
                                className="flex-1 sm:flex-none"
                                onClick={() => openModal("전체 약력 보기", <CareerHistoryModal />)}
                            >
                                전체 약력 보기
                            </SlideButton>

                            <SlideButton as="button" className="flex-1 sm:flex-none">
                                이력서 보기
                            </SlideButton>
                        </div> */}
                    </div>
                </div>

                {/* 기술 스택 */}
                <div className="">
                    <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-6 text-app-primary">기술 스택</h3>
                    <SkillTabs />
                </div>
            </div>

        </SectionLayout>
    );
}