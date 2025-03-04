"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createGoal, deleteGoal, updateGoal } from "@/services/goal";
import { GoalResponse } from "@/types/dashboard";

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "todos", "recent"],
      });

      router.push("/dashboard");
    },
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, title }: { goalId: number; title: string }) =>
      updateGoal(goalId, title),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["goal", { goalId: variables.goalId }],
      });
    },
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation<GoalResponse, Error, { title: string }>({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });
};
