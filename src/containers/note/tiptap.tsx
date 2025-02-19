"use client";

import "@/styles/tiptap.css";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

import Toolbar from "@/containers/note/toolbar";

interface TiptapProps {
  setContents: React.Dispatch<React.SetStateAction<string>>;
  onLinkSubmit?: (link: string) => void;
}

function Tiptap({ setContents, onLinkSubmit }: TiptapProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Markdown,
      Underline,
      Placeholder.configure({
        placeholder: "이 곳을 클릭해 노트 작성을 시작해주세요",
      }),
    ],
    content: "",
    onUpdate: ({ editor: updatedEditor }) => {
      setContents(updatedEditor.storage.markdown.getMarkdown());
    },
  });

  const handleLinkSubmit = (link: string) => {
    if (onLinkSubmit) {
      onLinkSubmit(link);
    }
  };

  return (
    <div className="custom-editor relative">
      {editor && <Toolbar editor={editor} onLinkSubmit={handleLinkSubmit} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Tiptap;
