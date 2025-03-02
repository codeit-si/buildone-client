"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import ListTodo from "@/components/@common/todo";
import { cn } from "@/lib/cn";
import { getDashboardOptions } from "@/services/dashboard/query";

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
    <div
      ref={listRef}
      className="scrollbar h-full overflow-y-auto"
      role="region"
    >
      {todos && (
        <ul className="flex flex-col gap-8 pr-8">
          {todos.map((todo, index) => (
            <ListTodo
              key={todo.id}
              todo={todo}
              index={index}
              showGoal
              showDropdownOnHover
            />
          ))}
        </ul>
      )}
      {!todos && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-40 text-sm text-slate-500">
            최근에 등록한 할 일이 없어요
          </span>
        </div>
      )}
      <div
        className={cn(
          "pointer-events-none bottom-0 -mt-10 h-30 w-full bg-gradient-to-t from-white from-10% to-white/0 to-70%",
          isOverflowing ? "sticky" : "hidden",
        )}
      />
    </div>
  );
}
