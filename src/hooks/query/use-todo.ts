import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { invalidateTodoRelatedQueries } from "@/services/invalidate";
import { profileKeys, todoKeys } from "@/services/query-key";
import {
  createTodo,
  deleteTodo,
  getTodoDetail,
  TodoParams,
  updateTodo,
} from "@/services/todo";
import { TodoResponse } from "@/types/todo";
import { successToast } from "@/utils/custom-toast";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: (data) => {
      invalidateTodoRelatedQueries(queryClient, data.goalInformation?.id);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      queryClient.invalidateQueries({ queryKey: todoKeys.counts });

      successToast("create-todo", "할 일이 생성되었습니다.");
    },
  });
};

export const useUpdateTodo = ({ updateAll }: { updateAll?: boolean }) => {
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
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      if (updateAll) {
        successToast("update-todo", "할 일이 수정되었습니다.");
      }
    },
  });
};

export const useDeleteTodo = (goalId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      invalidateTodoRelatedQueries(queryClient, goalId);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      queryClient.invalidateQueries({ queryKey: todoKeys.counts });

      successToast("delete-todo", "할 일이 삭제되었습니다.");
    },
  });
};

export const useTodoDetail = (todoId: number, isEditMode: boolean) => {
  return useQuery<TodoResponse>({
    queryKey: todoKeys.detail(todoId),
    queryFn: () => {
      return getTodoDetail(todoId);
    },
    enabled: !isEditMode && Boolean(todoId),
  });
};
