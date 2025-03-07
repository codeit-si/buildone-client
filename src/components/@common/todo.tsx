import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import FileIcon from "@/assets/icons-small/file.svg";
import LinkIcon from "@/assets/icons-small/link.svg";
import NoteIcon from "@/assets/icons-small/note.svg";
import TodoTitleAndCheckBox from "@/components/todo/todo-title-checkbox";
import { TodoResponse } from "@/types/todo";

import DetailSheet from "../note/detail-sheet";
import Goal from "../todo/goal";
import TodoDeletePopup from "../todo/todo-delete-popup";

import FixedDropdown from "./dropdown/fixed-dropdown";
import Sheet from "./portal/sheet";
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

export default function Todo({
  todo,
  showDropdownOnHover,
  index,
  showGoal,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();

  const getDropdownItems = (selectedTodoItem: TodoResponse): DropdownItem[] => {
    const baseItems: DropdownItem[] = [
      {
        id: "edit",
        label: "수정하기",
        onClick: () => {
          setIsEditModalOpen(true);
        },
      },
      {
        id: "delete",
        label: "삭제하기",
        onClick: () => setIsDeletePopupOpen(true),
      },
    ];

    if (selectedTodoItem.noteId !== null) {
      return [
        {
          id: "note",
          label: "노트보기",
          onClick: () =>
            router.push(
              `/todos/${selectedTodoItem.id}/note/${selectedTodoItem.noteId}/create`,
            ),
        },
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
        url: null,
        Icon: NoteIcon,
        onClick:
          currentTodo.noteId !== null ? () => setSheetOpen(true) : undefined,
      },
    ];

    return icons
      .filter(({ url, onClick }) => url !== null || onClick)
      .map(({ key, url, Icon, onClick }) =>
        url ? (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${key} 열기`}
          >
            <Icon />
          </Link>
        ) : (
          <button
            key={key}
            onClick={onClick}
            disabled={!onClick}
            aria-label={`${key} 열기`}
          >
            <Icon />
          </button>
        ),
      );
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
                noteId={todo.noteId}
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
      {sheetOpen && todo.noteId !== null && (
        <Sheet.Root open={sheetOpen} onOpenChange={setSheetOpen}>
          <DetailSheet noteId={todo.noteId} linkUrl={todo.linkUrl} />
        </Sheet.Root>
      )}
      {isEditModalOpen && (
        <TodoModal
          goalId={todo.goalInformation?.id}
          todo={todo}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
      {isDeletePopupOpen && (
        <TodoDeletePopup
          todoId={todo.id}
          todoTitle={todo.title}
          isDeletePopupOpen={isDeletePopupOpen}
          setIsDeletePopupOpen={setIsDeletePopupOpen}
          goalId={todo.goalInformation?.id}
        />
      )}
    </>
  );
}
