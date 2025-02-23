import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { GoalListParams } from "@/types/dashboard";

import { getDashboard, getInfiniteGoals } from ".";

export const getDashboardOptions = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

export const getInfiniteGoalsOptions = ({
  size = 3,
  sortOrder = "newest",
}: GoalListParams) => {
  return infiniteQueryOptions({
    queryKey: ["goals"],
    queryFn: ({ pageParam }) =>
      getInfiniteGoals({ size, sortOrder, pageParam }),
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
};
