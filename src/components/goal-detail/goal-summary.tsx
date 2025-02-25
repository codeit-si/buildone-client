"use client";

import { useQuery } from "@tanstack/react-query";

import FlagGoalIcon from "@/assets/flag-goal.svg";
import { getGoalOptions } from "@/services/goal/query";

import ProgressBar from "../@common/progress-bar";

import GoalSummaryDropdown from "./goal-summary-dropdown";

interface GoalSummaryProps {
  goalId: string;
}

export default function GoalSummary({ goalId }: GoalSummaryProps) {
  const { data } = useQuery(getGoalOptions(Number(goalId)));

  return (
    <div className="mt-0 rounded-12 border border-slate-100 bg-white px-24 py-16 md:mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-8">
          <FlagGoalIcon />
          <h2 className="text-base font-semibold md:text-lg">{data?.title}</h2>
        </div>
        <GoalSummaryDropdown />
      </div>
      <div className="mt-24">
        <p className="mb-8 text-xs font-semibold">Progress</p>
        <ProgressBar current={20} total={30} border={false} />
      </div>
    </div>
  );
}
