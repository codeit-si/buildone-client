"use client";

import { useCallback, useEffect, useState } from "react";

import LoadNoteToast from "@/components/note/load-toast";
import { TEMP_NOTE_KEY } from "@/constants/toast";

function checkHasContent(data: { title?: string; content?: string }) {
  const hasTitle = data.title && data.title.trim() !== "";
  const hasBody =
    data.content &&
    !data.content.includes("is-editor-empty") &&
    data.content.trim() !== "";
  return !!(hasTitle || hasBody);
}

export interface NoteData {
  title: string;
  content: string;
  link: string;
  savedAt: number;
}

interface LoadNoteToastManagerProps {
  onLoadNote: (data: NoteData) => void;
}

export default function LoadNoteToastManager({
  onLoadNote,
}: LoadNoteToastManagerProps) {
  const [showToast, setShowToast] = useState(false);
  const [tempNote, setTempNote] = useState<NoteData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TEMP_NOTE_KEY);
    if (stored) {
      try {
        const data: NoteData = JSON.parse(stored);
        if (data && checkHasContent(data)) {
          setTempNote(data);
          setShowToast(true);
        }
      } catch (error) {
        // 나중에 에러 관련 토스트 추가
      }
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleLoad = useCallback(() => {
    if (tempNote) {
      onLoadNote(tempNote);
      setShowToast(false);
    }
  }, [onLoadNote, tempNote]);

  return showToast ? (
    <LoadNoteToast onClose={handleClose} onLoad={handleLoad} />
  ) : null;
}
