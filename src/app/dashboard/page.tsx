import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import MyProgressContainer from "@/containers/dashboard/my-progress/my-progress-container";
import RecentlyTodoContainer from "@/containers/dashboard/recently-todo/recently-todo-container";
import TodosByGoalContainer from "@/containers/dashboard/todos-by-goal/todos-by-goal-container";
import getQueryClient from "@/lib/get-query-client";
import {
  getDashboardOptions,
  getInfiniteGoalsOptions,
} from "@/services/dashboard";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getDashboardOptions());
  queryClient.prefetchInfiniteQuery(getInfiniteGoalsOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="grid h-full min-h-screen w-full grid-rows-[repeat(2,_258px)_1fr] gap-x-24 gap-y-8 overflow-y-scroll bg-slate-100 px-16 md:grid-cols-2 md:grid-rows-[auto_250px_1fr]">
        <h1 className="hidden font-semibold md:col-span-2 md:block">
          대시보드
        </h1>
        <RecentlyTodoContainer />
        <MyProgressContainer />
        <TodosByGoalContainer />
      </main>
    </HydrationBoundary>
  );
}
