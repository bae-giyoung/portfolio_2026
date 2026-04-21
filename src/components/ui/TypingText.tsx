"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

interface TypingTextProps {
    className?: string;
    text: string | string[];
    typingSpeed?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
    cursorBlinkDuration?: number;
}

export default function TypingText({
    text,
    typingSpeed = 50,
    pauseDuration = 2000,
    deletingSpeed = 30,
    showCursor = true,
    cursorCharacter = "|",
    cursorBlinkDuration = 0.5,
    className = "",
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const cursorRef = useRef<HTMLSpanElement>(null);

    const textArray = useMemo(
        () => (Array.isArray(text) ? text : [text]),
        [text],
    );

    // 커서 깜빡임
    useEffect(() => {
        if (!showCursor || !cursorRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
        });

        return () => ctx.revert();
    }, [showCursor, cursorBlinkDuration]);

    // 타이핑 / 삭제 루프
    useEffect(() => {
        const currentText = textArray[textIndex];

        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            if (displayedText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % textArray.length);
                setCharIndex(0);
            } else {
                timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev.slice(0, -1));
                }, deletingSpeed);
            }
        } else {
            if (charIndex < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev + currentText[charIndex]);
                    setCharIndex((prev) => prev + 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseDuration);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, textIndex]);

    return (
        <span className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}>
            <span className="inline">{displayedText}</span>
            {showCursor && (
                <span ref={cursorRef} className="ml-1 inline-block">
                    {cursorCharacter}
                </span>
            )}
        </span>
    );
}
