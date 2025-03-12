"use client";

import { useState } from "react";

import { Editor } from "@tiptap/react";

import BoldIcon from "@/assets/editor/bold.svg";
import H1Icon from "@/assets/editor/h1.svg";
import H2Icon from "@/assets/editor/h2.svg";
import H3Icon from "@/assets/editor/h3.svg";
import H4Icon from "@/assets/editor/h4.svg";
import H5Icon from "@/assets/editor/h5.svg";
import ItalicIcon from "@/assets/editor/italic.svg";
import LinkIcon from "@/assets/editor/link.svg";
import UnderlineIcon from "@/assets/editor/underline.svg";
import Button from "@/components/@common/button";
import Modal from "@/components/@common/portal/modal";
import ToolbarButton from "@/components/note/toolbar-btn";
import "@/styles/note.css";

interface ToolbarProps {
  editor: Editor | null;
  onLinkSubmit: (link: string) => void;
}

export default function Toolbar({
  editor,
  onLinkSubmit,
}: ToolbarProps): JSX.Element | null {
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [inputLink, setInputLink] = useState("");

  if (!editor) return null;

  const openLinkModal = () => setLinkModalOpen(true);
  const closeLinkModal = () => {
    setLinkModalOpen(false);
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w .-]*)*\/?$/;
    const trimmedInput = inputLink.trim();

    if (trimmedInput && urlPattern.test(trimmedInput)) {
      onLinkSubmit(trimmedInput);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputLink(e.target.value);
  };

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
    // 링크 버튼
    {
      onClick: openLinkModal,
      IconComponent: LinkIcon,
      ariaLabel: "Link",
      isActive: false,
    },
  ];

  const linkInput = (
    <input
      type="text"
      value={inputLink}
      onChange={handleInputChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          closeLinkModal();
        }
      }}
      placeholder="https://"
      className="h-44 w-full truncate rounded-12 bg-slate-50 px-24 py-12 text-sm outline-none md:h-48 md:text-base"
    />
  );

  const confirmButton = (
    <Button
      variant="solid"
      shape="square"
      size="lg"
      className="w-full"
      onClick={closeLinkModal}
    >
      확인
    </Button>
  );

  return (
    <div
      className="sticky bottom-24 flex h-44 items-center justify-center rounded-22 border-slate-200 bg-white p-2 pl-16 shadow"
      style={{ justifyContent: "space-between" }}
    >
      <div style={{ display: "flex" }}>
        {buttonConfigs.slice(0, -1).map((btn) => (
          <ToolbarButton
            key={btn.ariaLabel}
            onClick={btn.onClick}
            IconComponent={btn.IconComponent}
            ariaLabel={btn.ariaLabel}
            isActive={btn.isActive}
          />
        ))}
      </div>
      <div
        style={{ marginRight: "16px", display: "flex", alignItems: "center" }}
      >
        <ToolbarButton
          onClick={buttonConfigs[buttonConfigs.length - 1].onClick}
          IconComponent={buttonConfigs[buttonConfigs.length - 1].IconComponent}
          ariaLabel={buttonConfigs[buttonConfigs.length - 1].ariaLabel}
          isActive={buttonConfigs[buttonConfigs.length - 1].isActive}
        />
      </div>
      {isLinkModalOpen && (
        <Modal.Root open={isLinkModalOpen} onOpenChange={setLinkModalOpen}>
          <Modal.Content className="w-311 md:w-520">
            <Modal.Title className="text-bold text-lg">링크 업로드</Modal.Title>
            <div className="mb-12 font-semibold">링크</div>
            {linkInput}
            <Modal.Footer>{confirmButton}</Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
}
