"use client";

import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import { cn } from "@/lib/cn";
import getQueryClient from "@/lib/get-query-client";
import { DashboardResponse, TodoResponse } from "@/types/dashboard";

interface RecentlyTodoCheckboxProps {
  todo: TodoResponse;
}

export default function RecentlyTodoCheckbox({
  todo: todoProp,
}: RecentlyTodoCheckboxProps) {
  const queryClient = getQueryClient();
  const { isDone } = todoProp;

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
    <div className="flex items-center gap-10">
      <label
        htmlFor={`todo-check-${todoProp.id}`}
        className="relative flex cursor-pointer items-center"
        aria-label={`${todoProp.title} ${isDone ? "완료됨" : "미완료"}`}
      >
        <input
          type="checkbox"
          id={`todo-check-${todoProp.id}`}
          checked={isDone}
          onChange={() => toggleStatus(todoProp.id)}
          className="peer absolute hidden"
        />
        {isDone ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </label>
      <span className={cn("truncate", isDone ? "line-through" : "")}>
        {todoProp.title}
      </span>
    </div>
  );
}
