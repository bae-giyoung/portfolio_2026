'use client';

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "../providers/ThemeProvider";
import { useToast } from "@/hooks/useToast";

interface CodeBlockProps {
    rawCode: string;
    language: "javascript" | "typescript" | "tsx" | "jsx" | "xml" | "css" | "html" | "java" | "python" | "bash"; // 라이브러리에서 타입 제공할 것 같은데?
}

function removeIndent(str: string) {
    // 줄바꿈 후 앞에 있는 공백들을 모두 찾아서 가장 짧은 공백 길이를 구함
    const match = str.match(/^[ \t]*(?=\S)/gm)
    const minIndent = match ? Math.min(...match.map(x => x.length)) : 0;

    // 가장 짧은 공백 길이만큼 모든 줄의 앞부분을 잘라내고, 앞뒤 빈 줄 제거
    // 앞뒤 공백 문자는 반드시 없어야 함! 블록 코드를 인라인으로 인식하지 않도록.
    return str.replace(new RegExp(`^[ \\t]{${minIndent}}`, "gm"), "").trim();
}

// 분리된 컴포넌트: 상태를 안전하게 관리하고 복사 버튼을 렌더링
function SyntaxHighlighterWithCopy({ 
    codeString, language, ...props 
}: any) {
    const { theme } = useTheme();
    const [isCopied, setIsCopied] = useState(false);

    const syntaxStyle = theme === "dark" ? vscDarkPlus : oneLight;

    const toast = useToast();

    const handleCopy = async () => {
        // 성공 시 실행할 공통 로직
        const handleSuccess = () => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        };

        // [case 1] 최신 clipboard API 지원 및 안전한 컨텍스트(HTTPS) 확인
        if(navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(codeString);
                handleSuccess();
                return;
            } catch(error) {
                console.error("최신 clipboard API 복사 실패: ", error);
            }
        }

        // [case 2] 구형 브라우저 또는 HTTP 환경을 위한 fallback
        try {
            // 임시 textarea 요소 생성
            const textArea = document.createElement("textarea");
            textArea.value = codeString;

            // 화면에서 숨기기
            textArea.style.position = "absolute";
            textArea.style.width = "0";
            textArea.style.height = "0";
            textArea.style.margin = "0";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.fontSize = "0";
            textArea.style.left = "-9999px";
            textArea.style.top = "-9999px";
            document.body.appendChild(textArea);

            // 텍스트 선택
            textArea.focus();
            textArea.select();

            // 구형 iOS 사파리를 위한 텍스트 선택 호환성 처리
            textArea.setSelectionRange(0, 999999);

            // 복사 명령 실행(현재 브라우저에서 select(drag)된 텍스트가 대상), 성공 시 true 반환
            const successful = document.execCommand("copy");

            // 임시 요소 삭제 및 메모리 정리
            document.body.removeChild(textArea);
            
            if(successful) {
                handleSuccess();
            } else {
                console.error("구형 clipboard API 복사 실패: 브라우저에서 거부함");
            }
        } catch (error) {
            console.error("구형 clipboard API Fallback 복사 중 에러 발생: ", error);
            toast.error("이 브라우저에서는 복사 기능을 지원하지 않습니다.");
        }
    }

    return (
        <div className="relative group">
            {/* 버튼 */}
            <button
                onClick={handleCopy}
                className={`
                    absolute top-3 right-3 px-2 py-1 bg-app-fg hover:bg-app-bg text-app-bg hover:text-app-fg 
                    border border-app-bg hover:border-app-fg text-xs rounded-md opacity-50 group-hover:opacity-100 
                    transition-opacity duration-200 cursor-pointer z-10
                `}
            >
                {isCopied ? "Copied!" : "Copy"}
            </button>

            <SyntaxHighlighter
                style={syntaxStyle}
                language={language}
                PreTag="div"
                showLineNumbers={true}
                wrapLines={true}
                className="rounded-md shadow-md border border-gray-700 m-0! dark:border-app-fg"
                customStyle={{
                    margin: 0,
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                }}
                {...props}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
}

export default function CodeBlock({
    rawCode,
    language
} : CodeBlockProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cleanCode = `
\`\`\`${language}
${removeIndent(rawCode)}
\`\`\`
    `;

    if(!isMounted) return;

    return (
        <div className="p-4">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props } : any) { // 타입 지정 반드시 하기!
                        const match = /language-(\w+)/.exec(className || ""); // 언어 이름 추출
                        const codeString = String(children).replace(/\n$/, "");
                        return !inline && match ? (
                            // 백틱 3개로 감싸진 여러줄의 코드 블럭일 경우
                            <SyntaxHighlighterWithCopy
                                codeString={codeString}
                                language={match[1]}
                                {...props}
                            />
                        ) : (
                            // 백틱 1개로 감싸진 인라은 코드일 경우 (예: `const a = 1`)
                            <code {...props} className="bg-gray200 text-blue-700 px-1 py-0.5 rounded border border-gray-700">
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {cleanCode}
            </ReactMarkdown>
        
        </div>
    );
}
