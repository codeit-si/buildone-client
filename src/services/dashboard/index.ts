import api from "@/lib/axios";
import {
  DashboardResponse,
  GoalListParams,
  GoalListResponse,
  TodoListResponse,
  TodosByGoalParams,
} from "@/types/dashboard";

import { ENDPOINT } from "../endpoint";

export const getDashboard = async () => {
  const { data } = await api.get<DashboardResponse>(ENDPOINT.DASHBOARD.GET);
  return data;
};

export const getInfiniteGoals = async ({
  size,
  sortOrder,
  cursor,
}: GoalListParams) => {
  const { data } = await api.get<GoalListResponse>(ENDPOINT.GOAL.GET_ALL, {
    params: {
      cursor,
      size,
      sortOrder,
    },
  });
  return data;
};

export const getInfiniteTodosByGoalId = async ({
  size,
  cursor,
  goalId,
  done,
}: TodosByGoalParams) => {
  const { data } = await api.get<TodoListResponse>(ENDPOINT.TODO.GET_ALL, {
    params: {
      goalId,
      cursor,
      size,
      done,
    },
  });
  return data;
};
