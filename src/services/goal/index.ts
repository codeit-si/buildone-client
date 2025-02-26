import api from "@/lib/axios";

import { ENDPOINT } from "../endpoint";

export const deleteGoal = async (goalId: number) => {
  const res = await api.delete(ENDPOINT.GOAL.DELETE(goalId));

  return res;
};
