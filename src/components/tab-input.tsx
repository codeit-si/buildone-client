"use client";

import { useEffect, useRef } from "react";

export interface TabItem {
  id: number;
  text: string;
}

interface TabInputProps {
  tab: TabItem;
  readOnly?: boolean;
  onInputChange: (id: number, newValue: string) => void; // 인풋 값이 변경될 때 호출
  onInputBlur: (id: number, text: string) => void; // 인풋이 포커스를 잃었을 때 호출
  className?: string;
}

export function TabInput({
  tab,
  onInputChange,
  onInputBlur,
  className,
  readOnly,
}: TabInputProps) {
  // input 요소에 대한 참조 생성
  const inputRef = useRef<HTMLInputElement>(null);

  // 탭 텍스트가 변경될 때마다 해당 인풋에 자동 포커스를 부여
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tab.text]);

  return (
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
      className={`outline-none ${className}`} // 스타일 적용
      readOnly={readOnly}
    />
  );
}
