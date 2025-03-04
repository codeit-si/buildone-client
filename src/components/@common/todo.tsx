import { useState } from "react";

import Link from "next/link";

import FileIcon from "@/assets/icons-small/file.svg";
import LinkIcon from "@/assets/icons-small/link.svg";
import NoteIcon from "@/assets/icons-small/note.svg";
import TodoTitleAndCheckBox from "@/components/todo/todo-title-checkbox";
import { useDeleteTodo } from "@/hooks/query/use-todo";
import { TodoResponse } from "@/types/todo";

import Goal from "../todo/goal";

import FixedDropdown from "./dropdown/fixed-dropdown";
import TodoModal from "./todo-modal/todo-modal";

interface Props {
  todo: TodoResponse;
  index: number;
  showGoal?: boolean;
  showDropdownOnHover?: boolean;
}
interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
}

export default function ListTodo({
  todo,
  showDropdownOnHover,
  index,
  showGoal,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate } = useDeleteTodo();

  const handleDelete = async (selectedTodoForDelete: TodoResponse) => {
    if (!selectedTodoForDelete.id) return;

    mutate(todo.id);
  };

  const getDropdownItems = (selectedTodoItem: TodoResponse): DropdownItem[] => {
    const baseItems: DropdownItem[] = [
      {
        id: "edit",
        label: "수정하기",
        onClick: () => {
          setIsEditModalOpen(true); // 모달 열기
        },
      },
      {
        id: "delete",
        label: "삭제하기",
        onClick: () => handleDelete(selectedTodoItem),
      },
    ];

    if (selectedTodoItem.noteId !== null) {
      return [
        { id: "note", label: "노트보기", onClick: () => {} },
        ...baseItems,
      ];
    }

    return baseItems;
  };

  const iconSpread = (currentTodo: TodoResponse) => {
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
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${key} 열기`}
        >
          <Icon />
        </Link>
      ));
  };

  return (
    <>
      <li
        aria-label={`할일: ${todo.title}, ${todo.isDone ? "완료됨" : "미완료"}`}
        className="group flex flex-col text-slate-800 hover:text-dark-blue-700"
      >
        <div className="flex items-center justify-between">
          <TodoTitleAndCheckBox index={index} todo={todo} />
          <div
            role="group"
            aria-label="할일 관련 작업"
            className="flex gap-5 text-slate-700"
          >
            {iconSpread(todo)}
            {showDropdownOnHover && (
              <FixedDropdown
                items={getDropdownItems(todo)}
                todoId={todo.id}
                todoNoteId={todo.noteId}
              />
            )}
          </div>
        </div>
        {showGoal && (
          <div>
            <Goal todo={todo} />
          </div>
        )}
      </li>
      {isEditModalOpen && (
        <TodoModal
          goalId={todo.goalInformation?.id}
          todo={todo}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </>
  );
}
