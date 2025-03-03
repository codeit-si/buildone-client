import { queryOptions } from "@tanstack/react-query";

import { getGoal } from ".";

export const getGoalOptions = (id: number) =>
  queryOptions({
    queryKey: ["goal", { goalId: id }],
    queryFn: () => getGoal(id),
  });
