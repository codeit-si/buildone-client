import { MouseEvent, useEffect } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import ArrowDropdownIcon from "@/components/@svgr/arrow-dropdown-icon";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import useSelector from "@/hooks/use-selector";
import { cn } from "@/lib/cn";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import { BASE_CLASS } from "../input";
import Label from "../label";

import { useTodoFormContext } from "./todo-form-provider";

interface GoalDropdownProps {
  goalId?: number;
}

export default function GoalDropdown({ goalId }: GoalDropdownProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    getInfiniteGoalsOptions({ size: 20 }),
  );
  const { ref: scrollRef, refTrigger } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  const { isOpen, ref, toggleHandler } = useSelector();
  const { selectedGoalId, setSelectedGoalId } = useTodoFormContext();

  const goalTitle = data?.pages.find(
    (page) => page.id === selectedGoalId,
  )?.title;

  const handleSelectGoal = (e: MouseEvent<HTMLButtonElement>) => {
    const dataset = e.currentTarget.dataset as { goal: string };
    const goalIdData = dataset.goal;
    setSelectedGoalId(Number(goalIdData));
    toggleHandler();
  };

  useEffect(() => {
    refTrigger();
  }, [isOpen, refTrigger]);

  useEffect(() => {
    if (goalId) {
      setSelectedGoalId(goalId);
    }
  }, [goalId, setSelectedGoalId]);

  return (
    <div
      className="relative"
      role="presentation"
      ref={ref}
      onClick={toggleHandler}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toggleHandler();
        }
      }}
    >
      <Label label="목표" />
      <span className={cn(BASE_CLASS, "cursor-pointer justify-between")}>
        {goalTitle ?? "목표를 선택해주세요."}{" "}
        <ArrowDropdownIcon reversal={isOpen} />
      </span>
      {isOpen && (
        <ul
          className={cn(
            "scrollbar absolute bottom-52 h-200 w-full overflow-auto rounded-xl border border-dark-blue-300 bg-slate-100",
          )}
        >
          {data?.pages.map((page) => (
            <li
              key={`create-todo-modal-${page.id}`}
              className="flex w-full items-center justify-between space-x-8 border border-slate-50 bg-slate-50 text-base font-normal hover:bg-slate-100"
            >
              <button
                type="button"
                data-goal={page.id}
                className="flex w-full justify-start px-24 py-12"
                onClick={handleSelectGoal}
              >
                {page.title}
              </button>
            </li>
          ))}
          {hasNextPage && <div ref={scrollRef}>로딩 중</div>}
        </ul>
      )}
    </div>
  );
}
