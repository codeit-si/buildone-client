import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { getGoal, getGoalList } from ".";

export const getGoalOptions = (id: number) =>
  queryOptions({
    queryKey: ["goal", { goalId: id }],
    queryFn: () => getGoal(id),
  });

export const getInfiniteGoalsOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["goals"],
    queryFn: ({ pageParam = 0 }) => {
      return getGoalList(pageParam);
    },
    getNextPageParam: (lastPage) =>
      lastPage.paginationInformation.hasNext
        ? lastPage.paginationInformation.nextCursor
        : null,
    initialPageParam: 0,
  });
};
