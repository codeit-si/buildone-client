import { queryOptions } from "@tanstack/react-query";

import apiClient from "@/lib/axios";
import { DashboardResponse } from "@/types/services";

import { ENDPOINT } from "../endpoint";

export const getDashboardOptions = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await apiClient.get(ENDPOINT.DASHBOARD.GET);
      return data as DashboardResponse;
    },
  });
