import { Dispatch, SetStateAction, useEffect } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { getInfiniteTodosByGoalIdOptions } from "@/services/dashboard/query";
import { GoalResponse } from "@/types/dashboard";

import RecentlyTodoCheckbox from "../recently-todo/recently-todo-item";

export interface SetNextType {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

interface TodoListByDoneProps {
  goal: GoalResponse;
  isDone: boolean;
  setNext?: Dispatch<SetStateAction<SetNextType | undefined>>;
}

export default function TodoListByDone({
  isDone,
  goal,
  setNext,
}: TodoListByDoneProps) {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({ goalId: goal.id, done: isDone }),
  );

  useEffect(() => {
    if (setNext) {
      setNext(() => ({
        fetchNextPage,
        hasNextPage,
      }));
    }
  }, [hasNextPage, fetchNextPage, setNext]);

  return (
    <div className="flex flex-col gap-12">
      <h4 className="text-sm font-semibold">{isDone ? "Done" : "To do"}</h4>
      {data.todos.length > 0 && (
        <ul>
          {data.todos.map((todo) => (
            <RecentlyTodoCheckbox
              key={`todo-list-by-goal-${todo.id}`}
              todo={todo}
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
