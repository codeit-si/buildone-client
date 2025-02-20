import GoalIcon from "@/assets/goal.svg";
import { Todo } from "@/types/todo";

interface GoalProps {
  todo: Todo;
}

const Goal = ({ todo: currentTodo }: GoalProps): JSX.Element | null => {
  // goalInformation이 없으면 렌더링하지 않음
  const { goalInformation, isDone } = currentTodo;

  if (!goalInformation) return null;

  // isDone이 true일 때 취소선 적용
  return (
    <div className="ml-27 mt-10 flex items-center gap-10 text-slate-700">
      <GoalIcon />
      <p className={`${isDone ? "line-through" : ""}`}>
        {goalInformation.title}
      </p>
    </div>
  );
};

export default Goal;
