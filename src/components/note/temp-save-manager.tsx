"use client";

import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import TempSaveToast from "@/components/note/save-toast";

interface TempNoteData {
  title: string;
  content: string;
  link: string;
  savedAt: number;
}

const TEMP_NOTE_KEY = "tempNote";

export interface TempSaveManagerRef {
  saveTempNote: () => void;
}

export interface TempSaveManagerProps {
  title: string;
  content: string;
  link: string;
}

export default forwardRef(function TempSaveManager(
  { title, content, link }: TempSaveManagerProps,
  ref: Ref<TempSaveManagerRef>,
) {
  const [showToast, setShowToast] = useState(false);

  const saveTempNote = useCallback(() => {
    const noteData: TempNoteData = {
      title,
      content,
      link,
      savedAt: Date.now(),
    };
    localStorage.setItem(TEMP_NOTE_KEY, JSON.stringify(noteData));
    setShowToast(true);
  }, [title, content, link]);

  useImperativeHandle(
    ref,
    () => ({
      saveTempNote,
    }),
    [saveTempNote],
  );

  // 5분마다 자동 저장
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveTempNote();
    }, 300000);
    return () => clearInterval(intervalId);
  }, [saveTempNote]);

  // 토스트 메시지 1.9초 후 자동 사라짐
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1999);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return showToast ? <TempSaveToast /> : null;
});
