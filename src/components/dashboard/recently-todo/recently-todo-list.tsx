"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import GradientProvider from "@/components/goal-detail/gradient-provider";
import Todo from "@/components/todo/todo";
import useInView from "@/hooks/use-in-view";
import { getDashboardOptions } from "@/services/dashboard/query";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());

  const [topRef, isTopInView] = useInView();
  const [bottomRef, isBottomInView] = useInView();

  const { todos } = data;

  return (
    <div className="relative" role="region">
      <GradientProvider topInView={isTopInView} bottomInView={isBottomInView}>
        {todos && (
          <div className="scrollbar max-h-152 overflow-y-scroll">
            <div ref={topRef} className="h-1 w-full" />
            <ul className="flex flex-col gap-8 pr-8">
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
            <div ref={bottomRef} className="h-1 w-full" />
          </div>
        )}
      </GradientProvider>
      {todos?.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-40 text-sm text-slate-500">
            최근에 등록한 할 일이 없어요
          </span>
        </div>
      )}
    </div>
  );
}
