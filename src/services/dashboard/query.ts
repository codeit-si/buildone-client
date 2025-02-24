import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { GoalListParams, TodosByGoalParams } from "@/types/dashboard";

import {
  getDashboard,
  getInfiniteGoals,
  getInfiniteTodosByGoalId,
  getProgressByGoalId,
} from ".";

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

export const getInfiniteTodosByGoalIdOptions = ({
  goalId,
  size = 5,
  done,
}: TodosByGoalParams) => {
  return infiniteQueryOptions({
    queryKey: ["todos", goalId, done],
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

export const getProgressByGoalIdOptions = (goalId: number) =>
  queryOptions({
    queryKey: ["progress", goalId],
    queryFn: () => getProgressByGoalId(goalId),
  });
