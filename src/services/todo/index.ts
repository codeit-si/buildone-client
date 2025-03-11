import { api } from "@/lib/axios";
import { TodoResponse } from "@/types/todo";
import { getCookie } from "@/utils/cookie";

import { ENDPOINT } from "../endpoint";

export interface TodoParams {
  goalId?: number;
  title: TodoResponse["title"];
  fileUrl?: TodoResponse["fileUrl"];
  linkUrl?: TodoResponse["linkUrl"];
  isDone: TodoResponse["isDone"];
}

export const createTodo = async (newTodo: TodoParams) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.post<TodoResponse>(ENDPOINT.TODO.CREATE, newTodo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateTodo = async (todoId: number, updatedTodo: TodoParams) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const url = ENDPOINT.TODO.UPDATE(todoId);
  const { data } = await api.put<TodoResponse>(url, updatedTodo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const deleteTodo = async (id: number) => {
  const accessToken = await getCookie("ACCESS_TOKEN");

  const { data } = await api.delete(ENDPOINT.TODO.DELETE(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
