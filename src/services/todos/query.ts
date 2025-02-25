import { QueryOptions } from "@tanstack/react-query";

import { TodoListResponse } from "@/types/todo";

import { getTodos } from ".";

export const getTodosOptions = (
  page: number,
): QueryOptions<TodoListResponse> => {
  return {
    queryKey: ["todos", page],
    queryFn: () => getTodos(page),
  };
};
