"use client";

import { useEffect, useRef, useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import PlusIcon from "@/assets/icons-small/plus/plus_db_sm.svg";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/cn";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

import Todo from "../todo/todo";
import TodoModal from "../todo-modal/todo-modal";

interface TodoListProps {
  goalId: string;
  done: boolean;
}

export default function TodoList({ goalId, done }: TodoListProps) {
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({
      goalId: Number(goalId),
      size: 7,
      done,
    }),
  );

  const { ref } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

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
    <>
      <div
        className={cn(
          "relative min-h-228 w-full rounded-12 px-24 py-16",
          done ? "bg-slate-200" : "bg-white",
        )}
      >
        <div className="flex justify-between">
          <h3 className="slate-800 text-lg font-bold">
            {done ? "Done" : "To do"}
          </h3>
          {!done && (
            <button
              type="button"
              className="z-10 flex cursor-pointer items-center gap-x-4 text-sm font-semibold text-dark-blue-500"
              aria-label="할일 추가하기"
              onClick={() => setShowCreateTodoModal(true)}
            >
              <PlusIcon />
              <p>할일 추가</p>
            </button>
          )}
        </div>
        {data.todos.length > 0 ? (
          <div className="relative">
            <div
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-10 h-50 w-full bg-gradient-to-b to-transparent transition-opacity duration-300",
                showTopGradient ? "opacity-100" : "opacity-0",
                done ? "from-slate-200" : "from-white",
              )}
            />
            <div
              className={cn(
                "scrollbar mt-16 max-h-152 overflow-y-scroll",
                done && "white",
              )}
              ref={scrollRef}
            >
              {data.todos.length > 0 && (
                <ul className="flex flex-col gap-8 pr-5">
                  {data.todos.map((todo) => (
                    <Todo
                      key={`todo-list-by-goal-${todo.id}`}
                      index={todo.id}
                      todo={todo}
                      showDropdownOnHover
                    />
                  ))}
                </ul>
              )}
              {hasNextPage && (
                <div ref={ref} className="flex justify-center pb-15 pt-20" />
              )}
            </div>
            <div
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 h-50 w-full bg-gradient-to-t to-transparent transition-opacity duration-300",
                showBottomGradient ? "opacity-100" : "opacity-0",
                done ? "from-slate-200" : "from-white",
              )}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-normal text-slate-500">
              {done ? "다 한 일이 아직 없어요" : "해야 할 일이 아직 없어요"}
            </span>
          </div>
        )}
      </div>
      {showCreateTodoModal && (
        <TodoModal
          goalId={Number(goalId)}
          open={showCreateTodoModal}
          onOpenChange={setShowCreateTodoModal}
        />
      )}
    </>
  );
}
