import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

import { ENDPOINT } from "../endpoint";

export const getDashboard = async () => {
  const { data } = await api.get<DashboardResponse>(ENDPOINT.DASHBOARD.GET);
  return data;
};
