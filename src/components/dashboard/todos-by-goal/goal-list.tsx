import React from "react";

import { GoalResponse } from "@/types/dashboard";

import GoalItem from "./goal-item";

interface GoalListProps {
  goals: GoalResponse[];
}

export default function GoalList({ goals }: GoalListProps) {
  return (
    <>
      <ul className="flex flex-col gap-16">
        {goals &&
          goals.map((goal) => (
            <GoalItem key={`dashboard-goal-${goal.id}`} goal={goal} />
          ))}
      </ul>
      {goals.length === 0 && (
        <div className="flex h-full min-h-200 w-full items-center justify-center text-sm text-slate-500">
          등록한 목표가 없어요
        </div>
      )}
    </>
  );
}
