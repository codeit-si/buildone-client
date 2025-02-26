import CheckBoxOffIcon from "@/assets/icons-small/checkbox/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/icons-small/checkbox/checkbox_on.svg";
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
  const { isDone } = todo;
  return (
    <div className="flex items-center gap-10">
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
      <p className={`line-clamp-1 ${isDone && "line-through"}`}>{todo.title}</p>
    </div>
  );
}
