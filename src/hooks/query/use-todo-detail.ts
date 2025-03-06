import { useQuery } from "@tanstack/react-query";

import { todoKeys } from "@/services/query-key";
import { getTodoDetail } from "@/services/todo";
import { TodoResponse } from "@/types/todo";

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
