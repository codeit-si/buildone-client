import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTodo,
  deleteTodo,
  TodoParams,
  updateTodo,
} from "@/services/todo";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      newTodo,
    }: {
      todoId: number;
      newTodo: TodoParams;
    }) => updateTodo(todoId, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
