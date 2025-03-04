import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AllListTodo from "@/components/todo/all-list-todo";
import getQueryClient from "@/lib/get-query-client";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({ size: 40 }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-792 px-16 max-lg:mx-auto md:px-24 lg:ml-80 lg:px-0">
        <AllListTodo />
      </div>
    </HydrationBoundary>
  );
}
