import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import RecentlyTodoContainer from "@/containers/dashboard/recently-todo-container";
import getQueryClient from "@/lib/get-query-client";
import { getDashboardOptions } from "@/services/dashboard";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getDashboardOptions());

  return (
    <main className="mx-auto min-h-screen w-full bg-slate-100 px-16">
      <h1 className="hidden font-semibold md:block">대시보드</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecentlyTodoContainer />
      </HydrationBoundary>
    </main>
  );
}
