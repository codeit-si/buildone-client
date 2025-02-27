import api from "@/lib/axios";

import { ENDPOINT } from "../endpoint";

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
