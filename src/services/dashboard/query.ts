import { queryOptions } from "@tanstack/react-query";

import { getDashboard } from ".";

export const getDashboardOptions = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });
