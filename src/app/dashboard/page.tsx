import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import RecentlyTodo from "@/containers/dashboard/recently-todo";
import getQueryClient from "@/lib/get-query-client";
import { getDashboardOptions } from "@/services/dashboard";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getDashboardOptions());

  return (
    <div>
      <h1>대시보드</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>로딩중</div>}>
          <RecentlyTodo />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
