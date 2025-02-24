import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import { cn } from "@/lib/cn";
import { titleLengthBreakpoints } from "@/styles/todo";
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
  const todoTitle = (
    <span className={cn(isDone && "line-through")}>
      {titleLengthBreakpoints.map(({ maxLength, className }) => (
        <span
          key={todo.title + todo.createdAt}
          className={cn("font-medium", className)}
        >
          {maxLength ? `${todo.title.slice(0, maxLength)}...` : todo.title}
        </span>
      ))}
    </span>
  );
  return (
    <div className="flex items-center gap-10 overflow-hidden text-nowrap">
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
      {todoTitle}
    </div>
  );
}
