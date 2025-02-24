import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import { Todo } from "@/types/todo";

interface TodoTitleAndCheckBoxProps {
  index: number;
  todo: Todo;
  toggleStatus?: (id: number) => void;
}

export default function TodoTitleAndCheckBox({
  index,
  todo,
  toggleStatus,
}: TodoTitleAndCheckBoxProps) {
  const { isDone } = todo; // "isDone" 상태로 변경

  return (
    <div className="flex w-3/5 items-center gap-10 overflow-hidden text-nowrap">
      <label
        htmlFor={`todo-check-${index}`}
        className="relative flex cursor-pointer items-center"
        aria-label={`${todo.title} ${isDone ? "완료됨" : "미완료"}`}
      >
        <input
          type="checkbox"
          id={`todo-check-${index}`}
          checked={isDone}
          aria-checked={isDone}
          onChange={() => toggleStatus && toggleStatus(todo.id)} // 상태 변경 시 id 전달
          className="peer absolute hidden"
        />
        {isDone ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </label>
      <span className={`font-medium ${isDone && "line-through"}`}>
        {todo.title}
      </span>
    </div>
  );
}
