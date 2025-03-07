import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { TodosByGoalParams } from "@/types/dashboard";
import { GoalListParams } from "@/types/goal";

import { dashboardKeys, goalKeys, todoKeys } from "../query-key";

import { getDashboard, getInfiniteGoals, getInfiniteTodosByGoalId } from ".";

export const getDashboardOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.recent(),
    queryFn: () => getDashboard(),
  });

export const getInfiniteGoalsOptions = ({
  size = 3,
  sortOrder = "newest",
}: GoalListParams) => {
  return infiniteQueryOptions({
    queryKey: goalKeys.list(size),
    queryFn: ({ pageParam }) =>
      getInfiniteGoals({ size, sortOrder, cursor: pageParam }),
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

export const getDashboardInfiniteTodosByGoalIdOptions = ({
  goalId,
  size = 5,
  done,
}: TodosByGoalParams) => {
  return infiniteQueryOptions({
    queryKey: todoKeys.list({ size, goalId, done }),
    queryFn: ({ pageParam }) => {
      return getInfiniteTodosByGoalId({
        goalId,
        done,
        size: pageParam > 0 ? 1000 : size,
        cursor: pageParam,
      });
    },
    getNextPageParam: (lastPage) =>
      lastPage.paginationInformation.hasNext
        ? lastPage.paginationInformation.nextCursor
        : null,
    initialPageParam: 0,
    select: (data) => ({
      pages: data.pages.map((page) => page.todos),
      todos: data.pages.flatMap((page) => page.todos),
      totalCount: data.pages[0].paginationInformation.totalCount,
      pageParams: data.pageParams,
    }),
  });
};
