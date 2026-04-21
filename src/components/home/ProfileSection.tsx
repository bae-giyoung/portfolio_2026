import SectionMeta from "@/components/ui/SectionMeta";
import SectionTitle from "@/components/ui/SectionTitle";
import CarouselSlider, { type CarouselSlide } from "@/components/ui/CarouselSlider";
import Badge from "../ui/Badge";
import { education, skillSet, profileSlides, workExperience, relevantExperience, allExperience } from "@/datas/profileDate";
import ExperienceList from "../ui/ExperienceList";

export default function ProfileSection() {
  return (
    <section id="profile" className="relative w-full flex flex-col gap-10 sm:gap-20 mt-20 pt-8 pb-20 border-t border-app-fg font-inst">
        {/* 섹션 메타 */}
        <SectionMeta number="02" category="about me" label="profile" />

        {/* 섹션 타이틀 */}
        <SectionTitle className="text-9xl font-bold text-app-fg overflow-hidden">Bae Gi Young</SectionTitle>

        <div className="w-full flex flex-row-reverse justify-between items-start">
            {/* 프로필 슬라이더 */}
            <div className="w-80">
                <CarouselSlider slides={profileSlides} interval={4000} />
            </div>

            {/* 프로필 정보 */}
            <div className="w-[calc(90%-20rem)] flex flex-col gap-10">
                {/* About */}
                {/* <p className="text-9xl font-bold font-space text-app-primary">*</p> */}
                <p className="mb-10 text-xl leading-relaxed">
                    안녕하세요. 문제 해결과 성장을 즐기는 프론트엔드 개발자 배기영입니다.
                    <br />
                    새로운 기술을 배우고, 협업을 통해 더 나은 사용자 경험을 만드는 데 가치를 두고 있습니다.
                    <br />
                    제 포트폴리오를 통해 저의 경험과 역량을 확인해보시고, 함께 멋진 프로젝트를 만들어 나가길 기대합니다!
                </p>

                {/* 직무 연관 이력 */}
                <h3 className="text-4xl font-bold">Relevant Experience</h3>
                <ul className="mb-5">
                    <ExperienceList items={relevantExperience} />
                </ul>

                {/* Skills */}
                <h3 className="text-4xl font-bold">Skills</h3>
                <p className="flex gap-2 flex-wrap">
                    {skillSet.map((skill, index) => (
                        <Badge key={index} text={skill} />
                    ))}
                </p>

            </div>
        </div>
    </section>
  );
}