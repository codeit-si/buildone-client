"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import FlagIcon from "@/assets/flag.svg";
import Button from "@/components/button";
import { getInfiniteGoalsOptions } from "@/services/dashboard";

import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

export default function TodosByGoalContainer() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({}),
  );
  // eslint-disable-next-line no-console
  console.log(data.pages);

  return (
    <SectionContainer>
      <SectionTitle>
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-blue-500">
          <FlagIcon />
        </div>
        <h2>최근 등록한 할 일</h2>
      </SectionTitle>
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage({})}>
        Load More
      </Button>
    </SectionContainer>
  );
}
