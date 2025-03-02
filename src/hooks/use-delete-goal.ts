"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteGoal } from "@/services/goal";

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
