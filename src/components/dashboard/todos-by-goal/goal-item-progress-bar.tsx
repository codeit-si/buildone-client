import { useQuery } from "@tanstack/react-query";

import ProgressBar from "@/components/@common/progress-bar";
import { getProgressByGoalIdOptions } from "@/services/dashboard/query";

interface GoalItemProgressBarProps {
  goalId: number;
}

export default function GoalItemProgressBar({
  goalId,
}: GoalItemProgressBarProps) {
  const { data } = useQuery(getProgressByGoalIdOptions(goalId));

  return (
    <div className="mb-16 mt-8">
      <ProgressBar total={100} current={data?.progress ?? 0} />
    </div>
  );
}
