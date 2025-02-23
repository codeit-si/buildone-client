import GoalIcon from "@/assets/goal.svg";
import { cn } from "@/lib/cn";
import { GoalSimpleResponse } from "@/types/dashboard";

interface GoalProps {
  goal: GoalSimpleResponse;
  isDone: boolean;
}

export default function Goal({ goal, isDone }: GoalProps) {
  return (
    <div className="ml-30 mt-10 flex items-center gap-10 text-slate-700">
      <GoalIcon />
      <p className={cn(isDone && "line-through")}>{goal.title}</p>
    </div>
  );
}
