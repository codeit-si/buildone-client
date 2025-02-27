import api from "@/lib/axios";
import { Todo, TodoListResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

export const getTodos = async (
  pageParam: number,
): Promise<TodoListResponse> => {
  const { data } = await api.get<TodoListResponse>(ENDPOINT.TODO.GET_ALL, {
    params: { page: pageParam },
  });
  return data;
};

export const createTodo = async (newTodo: Todo) => {
  const { data } = await api.post<Todo>(ENDPOINT.TODO.CREATE, newTodo);
  return data;
};
