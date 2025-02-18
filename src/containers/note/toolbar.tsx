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
import { cn } from "@/lib/cn";
import "@/styles/note.css";

interface ToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
  isActive: boolean;
}

function ToolbarButton({
  onClick,
  IconComponent,
  ariaLabel,
  isActive,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn("rounded p-2", { "bg-slate-400": isActive })}
    >
      <IconComponent className="h-25 w-25" aria-label={ariaLabel} />
    </button>
  );
}

function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const buttonConfigs = [
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      IconComponent: BoldIcon,
      ariaLabel: "Bold",
      isActive: editor.isActive("bold"),
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      IconComponent: ItalicIcon,
      ariaLabel: "Italic",
      isActive: editor.isActive("italic"),
    },
    {
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      IconComponent: UnderlineIcon,
      ariaLabel: "Underline",
      isActive: editor.isActive("underline"),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      IconComponent: H1Icon,
      ariaLabel: "H1",
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      IconComponent: H2Icon,
      ariaLabel: "H2",
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      IconComponent: H3Icon,
      ariaLabel: "H3",
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      IconComponent: H4Icon,
      ariaLabel: "H4",
      isActive: editor.isActive("heading", { level: 4 }),
    },
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      IconComponent: H5Icon,
      ariaLabel: "H5",
      isActive: editor.isActive("heading", { level: 5 }),
    },
  ];

  return (
    <div className="container-width fixed bottom-24 flex h-44 rounded-22 border-slate-200 bg-white p-2 pl-16 shadow">
      {buttonConfigs.map((btn) => (
        <ToolbarButton
          key={btn.ariaLabel}
          onClick={btn.onClick}
          IconComponent={btn.IconComponent}
          ariaLabel={btn.ariaLabel}
          isActive={btn.isActive}
        />
      ))}
    </div>
  );
}

export default Toolbar;
