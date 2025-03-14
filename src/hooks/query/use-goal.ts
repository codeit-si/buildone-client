"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createGoal, deleteGoal, updateGoal } from "@/services/goal";
import { invalidateGoalRelatedQueries } from "@/services/invalidate";
import { goalKeys, profileKeys } from "@/services/query-key";
import { GoalResponse } from "@/types/dashboard";
import { successToast } from "@/utils/custom-toast";

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onSuccess: () => {
      invalidateGoalRelatedQueries(queryClient);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      successToast("delete-goal", "목표가 삭제되었습니다.");

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
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      successToast("update-goal", "목표가 수정되었습니다.");
    },
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation<GoalResponse, Error, { title: string }>({
    mutationFn: createGoal,
    onSuccess: () => {
      invalidateGoalRelatedQueries(queryClient);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      successToast("create-goal", "목표가 생성되었습니다.");
    },
  });
};
