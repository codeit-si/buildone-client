import React from "react";

import { GoalResponse } from "@/types/dashboard";

import GoalItem from "./goal-item";

interface GoalListProps {
  goals: GoalResponse[];
}

export default function GoalList({ goals }: GoalListProps) {
  return (
    <ul className="flex flex-col gap-16">
      {goals &&
        goals.map((goal) => (
          <GoalItem key={`dashboard-goal-${goal.id}`} goal={goal} />
        ))}
    </ul>
  );
}
