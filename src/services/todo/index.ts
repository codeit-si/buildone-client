import api from "@/lib/axios";
import { Todo, TodoListResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

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

export const createTodo = async (newTodo: Todo) => {
  const { data } = await api.post<Todo>(ENDPOINT.TODO.CREATE, newTodo);
  return data;
};

export const updateTodo = async (updatedTodo: Todo) => {
  const url = ENDPOINT.TODO.UPDATE(updatedTodo.id);
  const { data } = await api.put<Todo>(url, updatedTodo);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete(ENDPOINT.TODO.DELETE(id));

  return data;
};
