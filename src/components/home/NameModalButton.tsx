'use client';

import { useSetAtom } from "jotai";
import { openModalAtom } from "@/atoms/atoms";
import CodeBlockViewer from "@/components/ui/CodeBlockViewer";

const codeString = `// Current State - 더 나은 개발자로 성장 중!
const BAE = () => {
  return (
    <WebDeveloper
      uxFriendly
      maintainable
      teamPlayer
      problemSolver
      attentionToDetail
      caffeineLevel="high"
      curiosity="infinite"
    />
  ) 
};

export default BAE;`;

export default function HeaderNameButton() {
  const openModal = useSetAtom(openModalAtom);

  const handleOpenModal = () => {
    
    openModal(
      <h2 className="font-noto font-bold text-lg text-app-fg">https://www.배기영.com</h2>,
      <CodeBlockViewer rawCode={codeString} language="tsx" />
    );
  };

  return (
    <button type="button" onClick={handleOpenModal} aria-label="배기영 소개 코드 보기">
      <span className="inline-block mr-2 cursor-pointer">배기영</span>
    </button>
  );
}
