import GoalIcon from "@/assets/goal.svg";
import { cn } from "@/lib/cn";
import { titleLengthBreakpoints } from "@/styles/todo";
import { Todo } from "@/types/todo";

interface GoalProps {
  todo: Todo;
}

export default function Goal({
  todo: currentTodo,
}: GoalProps): JSX.Element | null {
  const { goalInformation, isDone } = currentTodo;
  if (!goalInformation) return null;
  const goalInformationTitle = (
    <span className={cn(isDone && "line-through")}>
      {titleLengthBreakpoints.map(({ maxLength, className }) => (
        <span
          key={goalInformation.id + goalInformation.title}
          className={cn("font-medium", className)}
        >
          {maxLength
            ? `${goalInformation.title.slice(0, maxLength)}...`
            : goalInformation.title}
        </span>
      ))}
    </span>
  );
  return (
    <div className="flex items-center gap-10">
      <GoalIcon />
      {goalInformationTitle}
    </div>
  );
}
