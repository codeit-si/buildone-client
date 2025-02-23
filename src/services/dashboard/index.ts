import api from "@/lib/axios";
import {
  DashboardResponse,
  GoalListParams,
  GoalListResponse,
} from "@/types/dashboard";

import { ENDPOINT } from "../endpoint";

export const getDashboard = async () => {
  const { data } = await api.get<DashboardResponse>(ENDPOINT.DASHBOARD.GET);
  return data;
};

export const getInfiniteGoals = async ({
  size,
  sortOrder,
  pageParam,
}: GoalListParams & { pageParam: number }) => {
  const { data } = await api.get<GoalListResponse>(ENDPOINT.GOAL.GET_ALL, {
    params: {
      cursor: pageParam,
      size,
      sortOrder,
    },
  });
  return data;
};
