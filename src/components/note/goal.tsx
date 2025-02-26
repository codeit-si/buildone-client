"use client";

import FlagGoalIcon from "@/assets/icons-big/flag_goal_small.svg";

interface GoalProps {
  goalText: string;
}

export default function Goal({ goalText }: GoalProps) {
  return (
    <div className="mb-12 flex items-center">
      <FlagGoalIcon className="mr-6 h-24 w-24" />
      <div className="text-lg font-medium">{goalText}</div>
    </div>
  );
}
