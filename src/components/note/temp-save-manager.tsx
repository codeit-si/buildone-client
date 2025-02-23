"use client";

import { useCallback, useEffect, useState } from "react";

import TempSaveToast from "@/components/note/save-toast";

interface TempNoteData {
  title: string;
  content: string;
  link: string;
  savedAt: number;
}

const TEMP_NOTE_KEY = "tempNote";

export default function TempSaveManager() {
  const [showToast, setShowToast] = useState(false);

  const saveTempNote = useCallback(() => {
    const titleInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="노트의 제목을 입력해주세요"]',
    );
    const title = titleInput ? titleInput.value : "";
    const editorElement = document.querySelector<HTMLDivElement>(
      ".custom-editor [contenteditable]",
    );
    const content = editorElement ? editorElement.innerHTML : "";
    const linkElement = document.querySelector<HTMLElement>(".link-attached");
    const link = linkElement ? linkElement.textContent?.trim() || "" : "";
    const noteData: TempNoteData = {
      title,
      content,
      link,
      savedAt: Date.now(),
    };
    localStorage.setItem(TEMP_NOTE_KEY, JSON.stringify(noteData));
    setShowToast(true);
  }, []);

  // 5분마다 자동 저장
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveTempNote();
    }, 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, [saveTempNote]);

  // "임시저장" 버튼 클릭 시 저장 (버튼 이벤트 연결)
  useEffect(() => {
    const buttonElements = Array.from(
      document.querySelectorAll<HTMLButtonElement>("button"),
    );
    const tempSaveButton = buttonElements.find(
      (button) => button.textContent?.trim() === "임시저장",
    );
    if (tempSaveButton) {
      tempSaveButton.addEventListener("click", saveTempNote);
    }
    return () => {
      if (tempSaveButton) {
        tempSaveButton.removeEventListener("click", saveTempNote);
      }
    };
  }, [saveTempNote]);

  // 토스트 메시지 2초 후 자동 사라짐
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return showToast ? <TempSaveToast /> : null;
}
