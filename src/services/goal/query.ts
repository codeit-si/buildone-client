import { queryOptions } from "@tanstack/react-query";

import { goalKeys } from "../query-key";

import { getGoal, getProgressByGoalId } from ".";

export const getGoalOptions = (id: number) =>
  queryOptions({
    queryKey: goalKeys.detail(id),
    queryFn: () => getGoal(id),
  });

export const getProgressByGoalIdOptions = (id: number) =>
  queryOptions({
    queryKey: goalKeys.progress(id),
    queryFn: () => getProgressByGoalId(id),
  });
