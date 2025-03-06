import api from "@/lib/axios";
import {
  DashboardRecentTodoListResponse,
  DashboardStreakResponse,
  TodosByGoalParams,
} from "@/types/dashboard";
import { GoalListParams, GoalListResponse } from "@/types/goal";
import { TodoListResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

export const getDashboard = async () => {
  const { data } = await api.get<DashboardRecentTodoListResponse>(
    ENDPOINT.DASHBOARD.GET_TODOS,
  );
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

export const getTodoStreak = async (): Promise<DashboardStreakResponse> => {
  const { data } = await api.get<DashboardStreakResponse>(
    ENDPOINT.DASHBOARD.GET_TODO_STREAK,
  );
  return data;
};
