import { Dispatch, SetStateAction, useEffect } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import ListTodo from "@/components/@common/todo";
import { getDashboardInfiniteTodosByGoalIdOptions } from "@/services/dashboard/query";

export interface SetNextType {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

interface TodoListByDoneProps {
  goalId: number;
  isDone: boolean;
  setNext?: Dispatch<SetStateAction<SetNextType | undefined>>;
}

export default function TodoListByDone({
  isDone,
  goalId,
  setNext,
}: TodoListByDoneProps) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery(
      getDashboardInfiniteTodosByGoalIdOptions({ goalId, done: isDone }),
    );

  useEffect(() => {
    if (setNext) {
      setNext(() => ({
        fetchNextPage: () => fetchNextPage({}),
        hasNextPage,
        isFetching,
      }));
    }
  }, [hasNextPage, fetchNextPage, setNext, isFetching]);

  return (
    <div className="flex flex-col gap-12">
      <h4 className="text-sm font-semibold">{isDone ? "Done" : "To do"}</h4>
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
      {data.todos.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-slate-500">
            {isDone ? "아직 다 한 일이 없어요" : "아직 해야할 일이 없어요"}
          </p>
        </div>
      )}
    </div>
  );
}
