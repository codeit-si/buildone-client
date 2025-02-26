import Link from "next/link";

import FileIcon from "@/assets/icons-small/file.svg";
import LinkIcon from "@/assets/icons-small/link.svg";
import NoteIcon from "@/assets/icons-small/note.svg";
import TodoTitleAndCheckBox from "@/components/todo/todo-title-checkbox";
import { DropdownItem, Todo } from "@/types/todo";

import Goal from "../todo/goal";

import Dropdown from "./dropdown";

interface Props {
  todo: Todo;
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
  const getDropdownItems = (selectedTodo: Todo): DropdownItem[] => {
    const baseItems: DropdownItem[] = [
      { id: "edit", label: "수정하기", onClick: () => {} },
      { id: "delete", label: "삭제하기", onClick: () => {} },
    ];
    if (selectedTodo.noteId !== null) {
      return [
        { id: "note", label: "노트보기", onClick: () => {} },
        ...baseItems,
      ];
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
          <div
            aria-label="추가 작업"
            aria-expanded={showDropdownOnHover}
            className={`${
              showDropdownOnHover ? "hidden focus:block group-hover:block" : ""
            }`}
          >
            <Dropdown items={getDropdownItems(todo)} />
          </div>
        </div>
      </div>
      {showGoal && (
        <div className="ml-27">
          <Goal todo={todo} />
        </div>
      )}
    </li>
  );
}
