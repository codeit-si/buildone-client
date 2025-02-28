import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import AllListTodo from "@/components/todo/all-list-todo";
import getQueryClient from "@/lib/get-query-client";

export default async function TodosPage() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-2xl px-16 md:px-0">
        <AllListTodo />
      </div>
    </HydrationBoundary>
  );
}
