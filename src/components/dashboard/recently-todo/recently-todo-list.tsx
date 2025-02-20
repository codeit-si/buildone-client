"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { cn } from "@/lib/cn";
import { getDashboardOptions } from "@/services/dashboard/query";

import Goal from "./goal";
import RecentlyTodoCheckbox from "./recently-todo-item";
import TodoIcons from "./todo-icons";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());
  const [isOverflowing, setIsOverflowing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const { todos } = data;

  useEffect(() => {
    if (listRef.current) {
      setIsOverflowing(listRef.current.scrollHeight > 170);
    }
  }, [todos]);

  return (
    <div ref={listRef} className="scrollbar h-full overflow-y-auto">
      <ul className="flex flex-col gap-8 pr-8">
        {todos.map((todo) => (
          <li key={todo.id} className="text-sm">
            <div className="flex items-center justify-between">
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
