"use client";

import { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapProps {
  setContents: (content: string) => void;
}

const Tiptap = ({ setContents }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
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
