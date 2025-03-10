import { api } from "@/lib/axios";
import {
  DashboardRecentTodoListResponse,
  TodosByGoalParams,
} from "@/types/dashboard";
import { GoalListParams, GoalListResponse } from "@/types/goal";
import { TodoListResponse } from "@/types/todo";
import { getCookie } from "@/utils/cookie";

import { ENDPOINT } from "../endpoint";

export const getDashboard = async () => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<DashboardRecentTodoListResponse>(
    ENDPOINT.DASHBOARD.GET_TODOS,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const getInfiniteGoals = async ({
  size,
  sortOrder,
  cursor,
}: GoalListParams) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<GoalListResponse>(ENDPOINT.GOAL.GET_ALL, {
    params: {
      cursor,
      size,
      sortOrder,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<TodoListResponse>(ENDPOINT.TODO.GET_ALL, {
    params: {
      goalId,
      cursor,
      size,
      done,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
