"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import FlagGoalIcon from "@/assets/icons-big/flag_goal.svg";
import { getProgressByGoalIdOptions } from "@/services/dashboard/query";
import { getGoalOptions } from "@/services/goal/query";

import ProgressBar from "../@common/progress-bar";

import GoalSummaryDropdown from "./goal-summary-dropdown";
import GoalTitle from "./goal-title";

interface GoalSummaryProps {
  goalId: string;
}

export default function GoalSummary({ goalId }: GoalSummaryProps) {
  const { data: goalData } = useSuspenseQuery(getGoalOptions(Number(goalId)));
  const { data: progressData } = useSuspenseQuery(
    getProgressByGoalIdOptions(Number(goalId)),
  );

  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(goalData?.title || "");

  const inputRef = useRef<HTMLInputElement>(null);
  const previousTitle = goalData?.title || "";

  useEffect(() => {
    if (isTitleEditing) {
      const { length } = newTitle;

      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(length, length);
    }
  }, [isTitleEditing, newTitle]);

  return (
    <div className="mt-0 rounded-12 border border-slate-100 bg-white px-24 py-16 md:mt-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-x-8">
          <FlagGoalIcon className="flex-none" />
          <GoalTitle
            goalId={goalId}
            previousTitle={previousTitle}
            title={newTitle}
            setTitle={setNewTitle}
            editing={isTitleEditing}
            setEditing={setIsTitleEditing}
            inputRef={inputRef}
          />
        </div>
        <GoalSummaryDropdown
          goalId={goalId}
          setTitleEditing={setIsTitleEditing}
        />
      </div>
      <div className="mt-24">
        <p className="mb-8 text-xs font-semibold">Progress</p>
        <ProgressBar
          current={progressData?.progress ?? 0}
          total={100}
          border={false}
        />
      </div>
    </div>
  );
}
