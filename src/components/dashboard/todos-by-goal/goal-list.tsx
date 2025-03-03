import React from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import GoalItem from "./goal-item";

export default function GoalList() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({}),
  );
  const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage });

  return (
    <>
      <ul className="flex flex-col gap-16" aria-label="목표 리스트">
        {data?.pages?.map((goal) => (
          <GoalItem key={`dashboard-goal-${goal.id}`} goal={goal} />
        ))}
        {hasNextPage && <div ref={ref}>목표 로딩 중...</div>}
      </ul>
      {data?.pages?.length === 0 && (
        <div className="flex h-full min-h-200 w-full items-center justify-center text-sm text-slate-500">
          등록한 목표가 없어요
        </div>
      )}
    </>
  );
}
