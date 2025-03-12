"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import Todo from "@/components/@common/todo";
import { cn } from "@/lib/cn";
import { getDashboardOptions } from "@/services/dashboard/query";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  const { todos } = data;

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) {
        return;
      }

      setShowTopGradient(scrollRef.current.scrollTop > 0);
      setShowBottomGradient(
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop >
          scrollRef.current.clientHeight + 5,
      );
    };

    const element = scrollRef.current;
    element?.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => element?.removeEventListener("scroll", handleScroll);
  }, [data]);

  return (
    <div className="relative" role="region">
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-10 h-50 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300",
          showTopGradient ? "opacity-100" : "opacity-0",
        )}
      />
      {todos && (
        <ul
          ref={scrollRef}
          className="scrollbar flex max-h-152 flex-col gap-8 overflow-y-scroll pr-8"
        >
          {todos.map((todo, index) => (
            <Todo
              key={todo.id}
              todo={todo}
              index={index}
              showGoal
              showDropdownOnHover
            />
          ))}
        </ul>
      )}
      {todos?.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-40 text-sm text-slate-500">
            최근에 등록한 할 일이 없어요
          </span>
        </div>
      )}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 z-10 h-50 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300",
          showBottomGradient ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
