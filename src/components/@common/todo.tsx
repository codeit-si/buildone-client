import { useState } from "react";

import Link from "next/link";

import FileIcon from "@/assets/icons-small/file.svg";
import LinkIcon from "@/assets/icons-small/link.svg";
import NoteIcon from "@/assets/icons-small/note.svg";
import TodoTitleAndCheckBox from "@/components/todo/todo-title-checkbox";
import { TodoResponse } from "@/types/dashboard";
import { Todo } from "@/types/todo";

import Goal from "../todo/goal";

import { DropdownItemType } from "./dropdown/dropdown";
import FixedDropdown from "./dropdown/fixed-dropdown";
import TodoModal from "./todo-modal/todo-modal";

interface Props {
  todo: TodoResponse;
  index: number;
  showGoal?: boolean;
  showDropdownOnHover?: boolean;
  toggleStatus?: (id: number) => void;
}

export default function ListTodo({
  todo,
  showDropdownOnHover,
  index,
  toggleStatus,
  showGoal,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const getDropdownItems = (selectedTodo: Todo): DropdownItemType[] => {
    const baseItems: DropdownItemType[] = [
      { label: "수정하기", onClick: () => {} },
      { label: "삭제하기", onClick: () => {} },
    ];
    if (selectedTodo.noteId !== null) {
      return [{ label: "노트보기", onClick: () => {} }, ...baseItems];
    }
    return baseItems;
  };

  const iconSpread = (currentTodo: Todo) => {
    const icons = [
      { key: "file", url: currentTodo.fileUrl, Icon: FileIcon },
      { key: "link", url: currentTodo.linkUrl, Icon: LinkIcon },
      {
        key: "note",
        url: currentTodo.noteId ? `/notes/${currentTodo.noteId}` : null,
        Icon: NoteIcon,
      },
    ];

    return icons
      .filter(({ url }) => url !== null)
      .map(({ key, url, Icon }) => (
        <Link
          key={key}
          href={url as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${key} 열기`}
        >
          <Icon />
        </Link>
      ));
  };

  return (
    <li
      aria-label={`할일: ${todo.title}, ${todo.isDone ? "완료됨" : "미완료"}`}
      className="group flex flex-col gap-8 text-slate-800 hover:text-dark-blue-700"
    >
      <div className="flex items-center justify-between">
        <TodoTitleAndCheckBox
          index={index}
          todo={todo}
          toggleStatus={toggleStatus}
        />
        <div
          role="group"
          aria-label="할일 관련 작업"
          className="flex gap-5 text-slate-700"
        >
          {iconSpread(todo)}
          {showDropdownOnHover && (
            <FixedDropdown items={getDropdownItems(todo)} />
          )}
        </div>
      </div>
      {showGoal && (
        <div className="ml-27">
          <Goal todo={todo} />
        </div>
      )}
      {isEditModalOpen && (
        <TodoModal
          goalId={todo.goalInformation?.id}
          todo={todo}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </li>
  );
}
