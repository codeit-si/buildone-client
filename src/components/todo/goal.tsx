import GoalIcon from "@/assets/goal.svg";
import { Todo } from "@/types/todo";

interface GoalProps {
  todo: Todo;
}

export default function Goal({
  todo: currentTodo,
}: GoalProps): JSX.Element | null {
  // goalInformation이 없으면 렌더링하지 않음
  const { goalInformation, isDone } = currentTodo;

  if (!goalInformation) return null;

  // isDone이 true일 때 취소선 적용
  return (
    <div className="flex items-center gap-10">
      <GoalIcon />
      <span className={`${isDone && "line-through"}`}>
        <span className="inline font-medium md:hidden lg:hidden">
          {`${goalInformation.title.slice(0, 5)}...`}
        </span>
        <span className="hidden overflow-hidden font-medium md:inline lg:hidden">
          {`${goalInformation.title.slice(0, 10)}...`}
        </span>
        <span className="hidden font-medium md:hidden lg:inline">
          {goalInformation.title}
        </span>
      </span>
    </div>
  );
}
