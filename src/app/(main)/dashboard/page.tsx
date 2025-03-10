import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import MyProgressContainer from "@/components/dashboard/my-progress/my-progress-container";
import RecentlyTodoContainer from "@/components/dashboard/recently-todo/recently-todo-container";
import TodosByGoalContainer from "@/components/dashboard/todos-by-goal/todos-by-goal-container";
import getQueryClient from "@/lib/get-query-client";
import {
  getDashboardOptions,
  getInfiniteGoalsOptions,
} from "@/services/dashboard/query";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getDashboardOptions());
  await queryClient.prefetchInfiniteQuery(getInfiniteGoalsOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full max-w-1203 grid-rows-[repeat(2,_258px)_1fr] gap-x-24 gap-y-8 bg-slate-100 p-16 text-slate-800 md:grid md:grid-cols-2 md:grid-rows-[auto_250px_1fr] md:px-24 lg:px-80">
        <h1 className="my-8 hidden text-18 font-semibold md:col-span-2 md:block md:text-lg">
          대시보드
        </h1>
        <RecentlyTodoContainer />
        <MyProgressContainer />
        <TodosByGoalContainer />
      </div>
    </HydrationBoundary>
  );
}
