"use client";

import { Editor } from "@tiptap/react";

import BoldIcon from "@/assets/editor/bold.svg";
import H1Icon from "@/assets/editor/h1.svg";
import H2Icon from "@/assets/editor/h2.svg";
import H3Icon from "@/assets/editor/h3.svg";
import H4Icon from "@/assets/editor/h4.svg";
import H5Icon from "@/assets/editor/h5.svg";
import ItalicIcon from "@/assets/editor/italic.svg";
import UnderlineIcon from "@/assets/editor/underline.svg";

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="fixed bottom-24 flex h-44 w-349 rounded-22 border-slate-200 bg-white p-2 pl-16 shadow md:w-636 lg:w-792">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="rounded p-2"
      >
        <BoldIcon className="h-25 w-25" aria-label="Bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="rounded p-2"
      >
        <ItalicIcon className="h-25 w-25" aria-label="Italic" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="rounded p-2"
      >
        <UnderlineIcon className="h-25 w-25" aria-label="Underline" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="rounded p-2"
      >
        <H1Icon className="h-25 w-25" aria-label="H1" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="rounded p-2"
      >
        <H2Icon className="h-25 w-25" aria-label="H2" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="rounded p-2"
      >
        <H3Icon className="h-25 w-25" aria-label="H3" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className="rounded p-2"
      >
        <H4Icon className="h-25 w-25" aria-label="H4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className="rounded p-2"
      >
        <H5Icon className="h-25 w-25" aria-label="H5" />
      </button>
    </div>
  );
};

export default Toolbar;
