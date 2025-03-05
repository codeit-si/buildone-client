"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createGoal, deleteGoal, updateGoal } from "@/services/goal";
import { invalidateGoalRelatedQueries } from "@/services/invalidate";
import { goalKeys } from "@/services/query-key";
import { GoalResponse } from "@/types/dashboard";

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onSuccess: () => {
      invalidateGoalRelatedQueries(queryClient);

      router.push("/dashboard");
    },
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, title }: { goalId: number; title: string }) =>
      updateGoal(goalId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goalKeys.all,
      });
    },
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation<GoalResponse, Error, { title: string }>({
    mutationFn: createGoal,
    onSuccess: () => {
      invalidateGoalRelatedQueries(queryClient);
    },
  });
};
