'use client';

import TypingText from "./text/TypingText";
import GrabPeelImage from "./GrabPeelImage";
import charFunny from "@/assets/character-2.webp";
import profilImg from "@/assets/profile-00.webp";


export default function Polaroid() {
    return (
        <div className="relative w-full h-full">
            <div
                className={`w-full h-full
                    bg-white px-6 pt-7.5 pb-12
                    dark:bg-transparent dark:border-none dark:shadow-none
                    shadow-2xl`}
            >
                <div className={`
                    absolute -left-[5%] bottom-0 w-70 h-15  
                    bg-app-primary opacity-0 invisible dark:opacity-100 dark:visible rotate-0 z-1
                `}>
                </div>

                {/* 사진 위치 */}
                <GrabPeelImage
                    className="image-container relative w-full h-full aspect-5/4"
                    frontSrc={profilImg}
                    backSrc={charFunny}
                    frontAlt="프로필 사진 1"
                    backAlt="내 캐릭터 2"
                />

                <div className="my-text relative mt-3 text-[#444] dark:text-black z-10">
                    <TypingText
                        className="font-medium text-[14px]"
                        text={["협업 능력이 뛰어난 개발자", "문제를 해결하는 것을 즐기는 개발자", "끊임없이 성장하는 개발자"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor
                        cursorCharacter="_"
                        deletingSpeed={50}
                        cursorBlinkDuration={0.5}
                    />
                </div>
            </div>
        </div>
    );
}
