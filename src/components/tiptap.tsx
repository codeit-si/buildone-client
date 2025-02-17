"use client";

import { useEffect } from "react";

import "@/styles/tiptap.css";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapProps {
  setContents: (content: string) => void;
}

const Tiptap = ({ setContents }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "이 곳을 클릭해 노트 작성을 시작해주세요",
      }),
    ],
    content: "",
    onUpdate: ({ editor: updatedEditor }) => {
      setContents(updatedEditor.getText());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
