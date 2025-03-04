"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import PlusIcon from "@/assets/icons-small/plus/plus_db_sm.svg";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/cn";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

import LoadingSpinner from "../@common/loading-spinner";
import ListTodo from "../@common/todo";

interface TodoListProps {
  goalId: string;
  done: boolean;
}

export default function TodoList({ goalId, done }: TodoListProps) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({
      goalId: Number(goalId),
      done,
    }),
  );

  const { ref } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  return (
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
          >
            <PlusIcon />
            <p>할일 추가</p>
          </button>
        )}
      </div>
      {data.todos.length > 0 ? (
        <div className="mt-16">
          {data.todos.length > 0 && (
            <ul className="flex flex-col gap-8">
              {data.todos.map((todo) => (
                <ListTodo
                  key={`todo-list-by-goal-${todo.id}`}
                  index={todo.id}
                  todo={todo}
                  showDropdownOnHover
                />
              ))}
            </ul>
          )}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center pb-15 pt-20">
              <LoadingSpinner size={20} />
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-normal text-slate-500">
            {done ? "다 한 일이 아직 없어요" : "해야 할 일이 아직 없어요"}
          </span>
        </div>
      )}
    </div>
  );
}
