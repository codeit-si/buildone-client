import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import GoalSummary from "@/components/goal-detail/goal-summary";
import RouteButtonToNotes from "@/components/goal-detail/route-button-to-notes";
import TodoList from "@/components/goal-detail/todo-list";
import getQueryClient from "@/lib/get-query-client";
import { getProgressByGoalIdOptions } from "@/services/dashboard/query";
import { getGoalOptions } from "@/services/goal/query";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

export default async function GoalDetailPage({
  params,
}: {
  params: { goalId: string };
}) {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getGoalOptions(Number(params.goalId))),
    queryClient.prefetchQuery(
      getProgressByGoalIdOptions(Number(params.goalId)),
    ),
    queryClient.prefetchInfiniteQuery(
      getInfiniteTodosByGoalIdOptions({
        goalId: Number(params.goalId),
        done: true,
      }),
    ),
    queryClient.prefetchInfiniteQuery(
      getInfiniteTodosByGoalIdOptions({
        goalId: Number(params.goalId),
        done: false,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-343 py-16 max-lg:mx-auto md:w-636 md:py-24 lg:ml-80 lg:w-1200">
        <h1 className="hidden text-lg font-semibold md:block">목표</h1>
        <div className="flex flex-col gap-16 md:gap-24">
          <GoalSummary goalId={params.goalId} />
          <RouteButtonToNotes goalId={params.goalId} />
          <div className="flex flex-col gap-16 md:gap-24 lg:flex-row lg:items-start">
            <TodoList goalId={params.goalId} done={false} />
            <TodoList goalId={params.goalId} done />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
