"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import ListTodo from "@/components/@common/todo";
import { cn } from "@/lib/cn";
import getQueryClient from "@/lib/get-query-client";
import { getDashboardOptions } from "@/services/dashboard/query";
import { DashboardResponse } from "@/types/dashboard";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());
  const [isOverflowing, setIsOverflowing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const queryClient = getQueryClient();

  const { todos } = data;

  useEffect(() => {
    if (listRef.current) {
      setIsOverflowing(listRef.current.scrollHeight > 170);
    }
  }, [todos]);

  const toggleStatus = (id: number) => {
    queryClient.setQueryData<DashboardResponse>(["dashboard"], (oldData) => {
      if (!oldData) return oldData;
      const clonedData = {
        ...oldData,
        todos: oldData.todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
        ),
      };
      return clonedData;
    });
  };

  return (
    <div
      ref={listRef}
      className="scrollbar h-full overflow-y-auto"
      role="region"
    >
      <ul className="flex flex-col gap-8 pr-8">
        {todos.map((todo, index) => (
          <ListTodo
            key={todo.id}
            todo={todo}
            index={index}
            toggleStatus={toggleStatus}
            showGoal
          />
        ))}
      </ul>
      <div
        className={cn(
          "pointer-events-none bottom-0 -mt-10 h-30 w-full bg-gradient-to-t from-white from-30% to-white/0",
          isOverflowing ? "sticky" : "hidden",
        )}
      />
    </div>
  );
}
