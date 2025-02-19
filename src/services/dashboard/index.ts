import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import apiClient from "@/lib/axios";
import {
  DashboardResponse,
  GoalListParams,
  GoalListResponse,
} from "@/types/dashboard";

import { ENDPOINT } from "../endpoint";

export function getDashboardOptions() {
  return queryOptions({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<DashboardResponse> => {
      const { data } = await apiClient.get(ENDPOINT.DASHBOARD.GET);
      return data;
    },
  });
}

export function getInfiniteGoalsOptions({
  size = 3,
  sortOrder = "newest",
}: GoalListParams) {
  return infiniteQueryOptions({
    queryKey: ["goals"],
    queryFn: async ({ pageParam }): Promise<GoalListResponse> => {
      const { data } = await apiClient.get(ENDPOINT.GOAL.GET_ALL, {
        params: {
          cursor: pageParam,
          size,
          sortOrder,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.paginationInformation.hasNext
        ? lastPage.paginationInformation.nextCursor
        : null,
    initialPageParam: 0,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.goals),
      pageParams: data.pageParams,
    }),
  });
}
