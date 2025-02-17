import { queryOptions } from "@tanstack/react-query";

import apiClient from "@/lib/axios";

import { ENDPOINT } from "../endpoint";

interface GoalSimpleResponse {
  id: number;
  title: string;
}

interface TodoResponse {
  id: number;
  noteId: number | null;
  title: string;
  goalInformation: GoalSimpleResponse;
  linkUrl?: string;
  fileUrl?: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardResponse {
  progress: number;
  todos: TodoResponse[];
}

export const getDashboardOptions = () =>
  queryOptions({
    queryKey: ["recentlyTodo"],
    queryFn: async () => {
      const { data } = await apiClient.get(ENDPOINT.DASHBOARD.GET);
      return data as DashboardResponse;
    },
  });
