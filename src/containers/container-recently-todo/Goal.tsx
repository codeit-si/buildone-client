import GoalIcon from "@/assets/goal.svg";
import { Todo } from "@/types/todo";

interface GoalProps {
  todo: Todo;
}
const Goal = ({ todo }: GoalProps): JSX.Element | null => {
  if (!todo.hasGoal) return null;
  return (
    <div className="ml-27 mt-10 flex items-center gap-10 text-slate-700">
      <GoalIcon />
      <p className={`${todo.status === "done" ? "line-through" : ""}`}>
        {todo.hasGoal}
      </p>
    </div>
  );
};
export default Goal;
