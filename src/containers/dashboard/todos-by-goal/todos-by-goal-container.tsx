"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import Button from "@/components/button";
import { getInfiniteGoalsOptions } from "@/services/dashboard";

export default function TodosByGoalContainer() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({}),
  );
  // eslint-disable-next-line no-console
  console.log(data.pages);

  return (
    <section className="w-full rounded-2xl bg-white md:col-span-2 md:mt-16">
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage({})}>
        Load More
      </Button>
    </section>
  );
}
