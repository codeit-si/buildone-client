"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import FlagIcon from "@/assets/flag.svg";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

import GoalList from "./goal-list";

export default function TodosByGoalContainer() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({}),
  );
  const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage });

  return (
    <SectionContainer className="md:col-span-2">
      <SectionTitle>
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-blue-500">
          <FlagIcon />
        </div>
        <h2 className="line-clamp-1">목표 별 할일</h2>
      </SectionTitle>
      {data?.pages && <GoalList goals={data.pages} />}
      {hasNextPage && <div ref={ref}>목표 로딩 중...</div>}
    </SectionContainer>
  );
}
