import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { invalidateTodoRelatedQueries } from "@/services/invalidate";
import { todoKeys } from "@/services/query-key";
import {
  createTodo,
  deleteTodo,
  getTodoDetail,
  TodoParams,
  updateTodo,
} from "@/services/todo";
import { TodoResponse } from "@/types/todo";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: (data) => {
      invalidateTodoRelatedQueries(queryClient, data.goalInformation?.id);
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
    onSuccess: (data) => {
      invalidateTodoRelatedQueries(queryClient, data.goalInformation?.id);
    },
  });
};

export const useDeleteTodo = (goalId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      invalidateTodoRelatedQueries(queryClient, goalId);
    },
  });
};

export const useTodoDetail = (todoId: number, isEditMode: boolean) => {
  return useQuery<TodoResponse>({
    queryKey: todoKeys.detail(todoId),
    queryFn: () => {
      if (!todoId) throw new Error("todoId가 필요합니다.");
      return getTodoDetail(todoId);
    },
    enabled: !isEditMode && Boolean(todoId),
  });
};
