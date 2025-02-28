import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import getQueryClient from "@/lib/get-query-client";
import { Todo, TodoListResponse } from "@/types/todo";

import { getTodos, updateTodo } from ".";

const queryClient = getQueryClient();

export const updateTodoInQuery = (updatedTodo: Todo) => {
  queryClient.setQueryData<InfiniteData<TodoListResponse>>(
    ["todos"],
    (oldData) => {
      if (!oldData) return oldData;

      const updatedPages = oldData.pages.map((page) => {
        const updatedTodos = page.todos.some(
          (todo) => todo.id === updatedTodo.id,
        )
          ? page.todos.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo,
            )
          : [...page.todos, updatedTodo];

        return {
          ...page,
          todos: updatedTodos,
        };
      });

      return {
        ...oldData,
        pages: updatedPages,
      };
    },
  );
};

export const refetchTodo = () => {
  queryClient.invalidateQueries({
    queryKey: ["todos"],
    refetchActive: true,
  });
};

export const toggleStatus = async (id: number) => {
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

  refetchTodo();
};

export const useAllTodosInfiniteQuery = () => {
  return useInfiniteQuery({
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
