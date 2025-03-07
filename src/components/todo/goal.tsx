import GoalIcon from "@/assets/icons-small/goal.svg";
import { TodoResponse } from "@/types/todo";

interface GoalProps {
  todo: TodoResponse;
}

export default function Goal({
  todo: currentTodo,
}: GoalProps): JSX.Element | null {
  const { goalInformation, isDone } = currentTodo;
  if (!goalInformation) return null;
  return (
    <div
      key={goalInformation.id}
      className="ml-27 mt-8 flex items-center gap-10"
    >
      <div className="relative">
        <GoalIcon />
      </div>
      <p className={`line-clamp-1 ${isDone && "line-through"}`}>
        {goalInformation.title}
      </p>
    </div>
  );
}
