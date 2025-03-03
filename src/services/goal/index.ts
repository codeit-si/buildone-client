import api from "@/lib/axios";
import { GoalListResponse, GoalResponse } from "@/types/goal";

import { ENDPOINT } from "../endpoint";

export const getGoal = async (id: number) => {
  const { data } = await api.get<GoalResponse>(ENDPOINT.GOAL.GET_BY_ID(id));

  return data;
};

export const getGoalList = async (pageParam: string | number) => {
  const { data } = await api.get<GoalListResponse>(ENDPOINT.GOAL.GET_ALL, {
    params: { cursor: pageParam },
  });
  return data;
};

export const deleteGoal = async (goalId: number) => {
  const res = await api.delete(ENDPOINT.GOAL.DELETE(goalId));

  return res;
};

export const updateGoal = async (goalId: number, title: string) => {
  const res = await api.put(ENDPOINT.GOAL.UPDATE(goalId), {
    title,
  });

  return res;
};

export const createGoal = async (newGoal: { title: string }) => {
  const { data } = await api.post<GoalResponse>(ENDPOINT.GOAL.CREATE, newGoal);
  return data;
};
