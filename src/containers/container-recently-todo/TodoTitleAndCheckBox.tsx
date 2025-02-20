import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import { Todo } from "@/types/todo";

interface TodoTitleAndCheckBoxProps {
  index: number;
  todo: Todo;
  toggleStatus: (id: string) => void;
}
const TodoTitleAndCheckBox = ({
  index,
  todo,
  toggleStatus,
}: TodoTitleAndCheckBoxProps) => {
  const isDone = todo.status === "done";
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
          onChange={() => toggleStatus(todo.id)}
          className="peer absolute hidden"
        />
        {isDone ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </label>
      <span className={`${isDone ? "line-through" : ""}`}>{todo.title}</span>
    </div>
  );
};
export default TodoTitleAndCheckBox;
