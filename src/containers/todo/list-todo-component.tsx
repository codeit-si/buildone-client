import FileIcon from "@/assets/file.svg";
import LinkIcon from "@/assets/link.svg";
import NoteIcon from "@/assets/note.svg";
import Goal from "@/containers/todo/Goal";
import TodoTitleAndCheckBox from "@/containers/todo/TodoTitleAndCheckBox";
import { DropdownItem, Todo } from "@/types/todo";

import Dropdown from "../../components/dropdown";

interface Props {
  todo: Todo;
  showDropdownOnHover?: boolean;
  index: number;
  toggleStatus: (id: number) => void;
  showGoal?: boolean;
}

export default function ListTodoComponent({
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
        <a key={key} href={url as string}>
          <Icon />
        </a>
      ));
  };

  return (
    <li
      key={todo.id}
      className="group relative text-slate-800 hover:text-purple-700"
    >
      <div className="flex items-center justify-between">
        <TodoTitleAndCheckBox
          index={index}
          todo={todo}
          toggleStatus={toggleStatus} // 상위 컴포넌트에서 받은 함수 사용
        />
        <div className="absolute right-0 top-0 flex gap-5 text-slate-700">
          {iconSpread(todo)}
          <div
            className={`${showDropdownOnHover && "hidden group-hover:block"}`}
          >
            <Dropdown items={getDropdownItems(todo)} />
          </div>
        </div>
      </div>
      {showGoal && <Goal todo={todo} />}
    </li>
  );
}
