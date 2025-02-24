"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import FlagIcon from "@/assets/flag.svg";
import Button from "@/components/@common/button";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

import GoalList from "./goal-list";

export default function TodosByGoalContainer() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({}),
  );

  return (
    <SectionContainer className="md:col-span-2">
      <SectionTitle>
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-blue-500">
          <FlagIcon />
        </div>
        <h2>최근 등록한 할 일</h2>
      </SectionTitle>
      {data?.pages && <GoalList goals={data.pages} />}
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage({})}>
        Load More
      </Button>
    </SectionContainer>
  );
}
