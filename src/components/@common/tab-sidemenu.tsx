"use client";

import { useEffect, useRef } from "react";

import { cva } from "class-variance-authority";

export interface TabItem {
  id: number;
  text: string;
}

interface TabInputProps {
  tab: TabItem;
  onInputChange: (id: number, newValue: string) => void; // 인풋 값이 변경될 때 호출
  onInputBlur: (id: number, text: string) => void; // 인풋이 포커스를 잃었을 때 호출
}

// 탭 스타일
const containerStyle = cva(
  "flex items-center bg-white rounded px-2 text-slate-700 h-9 w-full",
);

// 인풋 자체 스타일
const inputStyle = cva("flex-1 bg-transparent outline-none");

export function TabInput({ tab, onInputChange, onInputBlur }: TabInputProps) {
  // input 요소에 대한 참조 생성
  const inputRef = useRef<HTMLInputElement>(null);

  // 탭 텍스트가 변경될 때마다 해당 인풋에 자동 포커스를 부여
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tab.text]);

  return (
    <div role="group" aria-label="Editable Tab" className={containerStyle()}>
      {/* 탭 앞에 표시할 기호 */}
      <span className="mr-2">· </span>
      {/* 탭 인풋: 사용자가 입력할 수 있음 */}
      <input
        ref={inputRef} // input 요소 참조
        placeholder="목표를 입력해주세요"
        aria-label="Tab name input" // 접근성용
        type="text" // 텍스트 입력 타입
        value={tab.text} // 탭의 현재 텍스트 값
        // 인풋 내용이 변경
        onChange={(e) => onInputChange(tab.id, e.target.value)}
        // 인풋이 포커스를 잃음
        onBlur={() => onInputBlur(tab.id, tab.text)}
        className={inputStyle()} // 스타일 적용
      />
    </div>
  );
}
