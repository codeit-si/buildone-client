import api from "@/lib/axios";
import { TodoListResponse, TodoResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

export interface TodoParams {
  goalId?: number;
  title: TodoResponse["title"];
  fileUrl?: TodoResponse["fileUrl"];
  linkUrl?: TodoResponse["linkUrl"];
  isDone: TodoResponse["isDone"];
}

export const getTodos = async (
  pageParam: number,
): Promise<TodoListResponse> => {
  const { data } = await api.get<TodoListResponse>(ENDPOINT.TODO.GET_ALL, {
    params: { page: pageParam },
  });

  const hasNext = pageParam * 40 < data.paginationInformation.totalCount;

  return {
    ...data,
    paginationInformation: {
      ...data.paginationInformation,
      hasNext,
      nextCursor: hasNext ? pageParam + 1 : null,
    },
  };
};

export const createTodo = async (newTodo: TodoParams) => {
  const { data } = await api.post<TodoResponse>(ENDPOINT.TODO.CREATE, newTodo);
  return data;
};

export const updateTodo = async (todoId: number, updatedTodo: TodoParams) => {
  const url = ENDPOINT.TODO.UPDATE(todoId);
  const { data } = await api.put<TodoResponse>(url, updatedTodo);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete(ENDPOINT.TODO.DELETE(id));

  return data;
};

export const getTodoDetail = async (todoId: number): Promise<TodoResponse> => {
  const { data } = await api.get<TodoResponse>(ENDPOINT.TODO.GET_BY_ID(todoId));
  return data;
};
