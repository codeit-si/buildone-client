import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTodo,
  deleteTodo,
  TodoParams,
  updateTodo,
} from "@/services/todo";

const invalidateTodo = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: ["todos"],
  });
  queryClient.invalidateQueries({
    queryKey: ["dashboard", "todos", "recent"],
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: () => {
      invalidateTodo(queryClient);
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
      invalidateTodo(queryClient);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      invalidateTodo(queryClient);
    },
  });
};
