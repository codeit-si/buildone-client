import { infiniteQueryOptions } from "@tanstack/react-query";

import { TodosByGoalParams } from "@/types/dashboard";

import { getInfiniteTodosByGoalId } from "../dashboard";
import { todoKeys } from "../query-key";

export const getInfiniteTodosByGoalIdOptions = ({
  goalId,
  size = 40,
  done,
}: TodosByGoalParams) => {
  return infiniteQueryOptions({
    queryKey: todoKeys.list({ size, goalId, done }),
    queryFn: ({ pageParam }) => {
      return getInfiniteTodosByGoalId({
        goalId,
        done,
        size,
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
