import { api } from "@/lib/axios";
import { GoalResponse } from "@/types/goal";
import { getCookie } from "@/utils/cookie";

import { ENDPOINT } from "../endpoint";

export const getGoal = async (id: number) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<GoalResponse>(ENDPOINT.GOAL.GET_BY_ID(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const deleteGoal = async (goalId: number) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const res = await api.delete(ENDPOINT.GOAL.DELETE(goalId), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res;
};

export const updateGoal = async (goalId: number, title: string) => {
  const accessToken = await getCookie("ACCESS_TOKEN");
  const res = await api.put(
    ENDPOINT.GOAL.UPDATE(goalId),
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res;
};

export const createGoal = async (newGoal: { title: string }) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.post<GoalResponse>(ENDPOINT.GOAL.CREATE, newGoal, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getProgressByGoalId = async (goalId: number) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.get<{ progress: number }>(
    ENDPOINT.GOAL.GET_PROGRESS,
    {
      params: {
        goalId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
