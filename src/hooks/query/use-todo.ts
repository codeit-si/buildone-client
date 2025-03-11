import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateTodoRelatedQueries } from "@/services/invalidate";
import {
  createTodo,
  deleteTodo,
  TodoParams,
  updateTodo,
} from "@/services/todo";
import { successToast } from "@/utils/custom-toast";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: (data) => {
      invalidateTodoRelatedQueries(queryClient, data.goalInformation?.id);
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
      successToast("delete-todo", "할 일이 삭제되었습니다.");
    },
  });
};
