"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { cn } from "@/lib/cn";
import { getDashboardOptions } from "@/services/dashboard";

import Goal from "./goal";
import RecentlyTodoCheckbox from "./recently-todo-item";
import TodoIcons from "./todo-icons";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { todos } = data;

  useEffect(() => {
    if (listRef.current) {
      setIsOverflowing(listRef.current.scrollHeight > 170);
    }
  }, [todos]);

  return (
    <div className="scrollbar relative h-full overflow-y-auto">
      <ul ref={listRef} className="flex flex-col gap-8 pr-8">
        {todos.map((todo) => (
          <li key={todo.id} className="text-sm">
            <div className="z-50 flex items-center justify-between">
              <RecentlyTodoCheckbox todo={todo} />
              <TodoIcons todo={todo} />
            </div>
            {todo.goalInformation && (
              <Goal goal={todo.goalInformation} isDone={todo.isDone} />
            )}
          </li>
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
