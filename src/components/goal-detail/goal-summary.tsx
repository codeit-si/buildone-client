import FlagGoalIcon from "@/assets/flag-goal.svg";

import ProgressBar from "../@common/progress-bar";

import GoalSummaryDropdown from "./goal-summary-dropdown";

interface GoalSummaryProps {
  goalId: string;
}

export default function GoalSummary({ goalId }: GoalSummaryProps) {
  // 목표 요청

  return (
    <div className="mt-0 rounded-12 border border-slate-100 bg-white px-24 py-16 md:mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-8">
          <FlagGoalIcon />
          <h2 className="text-base font-semibold md:text-lg">
            목표 이름 ({goalId})
          </h2>
        </div>
        <GoalSummaryDropdown goalId={goalId} />
      </div>
      <div className="mt-24">
        <p className="mb-8 text-xs font-semibold">Progress</p>
        <ProgressBar current={20} total={30} border={false} />
      </div>
    </div>
  );
}
