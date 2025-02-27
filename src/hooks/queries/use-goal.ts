"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteGoal, updateGoal } from "@/services/goal";

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
        queryKey: ["dashboard"],
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
