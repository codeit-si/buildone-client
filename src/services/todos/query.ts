import {
  InfiniteData,
  useMutation,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import getQueryClient from "@/lib/get-query-client";
import { TodoListResponse } from "@/types/todo";

import { getTodos, updateTodo } from ".";

const queryClient = getQueryClient();

export const refetchTodo = () => {
  queryClient.invalidateQueries({
    queryKey: ["todos"],
    refetchActive: true,
  });
};

export const useToggleStatus = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const todoToUpdate = queryClient
        .getQueryData<InfiniteData<TodoListResponse>>(["todos"])
        ?.pages.flatMap((page) => page.todos)
        .find((todo) => todo.id === id);

      if (!todoToUpdate) return;

      queryClient.setQueryData<InfiniteData<TodoListResponse>>(
        ["todos"],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              todos: page.todos.map((todo) =>
                todo.id === todoToUpdate.id
                  ? { ...todo, isDone: !todo.isDone }
                  : todo,
              ),
            })),
          };
        },
      );

      await updateTodo({
        ...todoToUpdate,
        isDone: !todoToUpdate.isDone,
      });
    },
    onSuccess: () => refetchTodo(),
  });
};

export const useAllTodosInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam = 1 }) => getTodos(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.paginationInformation?.hasNext
        ? lastPage.paginationInformation.nextCursor
        : undefined;
    },
    initialPageParam: 1,
  });
};
