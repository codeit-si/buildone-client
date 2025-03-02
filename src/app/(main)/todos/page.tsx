import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AllListTodo from "@/components/todo/all-list-todo";
import getQueryClient from "@/lib/get-query-client";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({ size: 40 }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-2xl px-16 md:px-0">
        <AllListTodo />
      </div>
    </HydrationBoundary>
  );
}
