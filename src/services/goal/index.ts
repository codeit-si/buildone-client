import api from "@/lib/axios";
import { GoalResponse } from "@/types/goal";

import { ENDPOINT } from "../endpoint";

export const getGoal = async (id: number) => {
  const { data } = await api.get<GoalResponse>(ENDPOINT.GOAL.GET_BY_ID(id));

  return data;
};
