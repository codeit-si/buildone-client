"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getDashboardOptions } from "@/services/dashboard";

import Goal from "./goal";
import RecentlyTodoCheckbox from "./recently-todo-checkbox";
import TodoDropdown from "./todo-dropdown";

export default function RecentlyTodoList() {
  const { data } = useSuspenseQuery(getDashboardOptions());
  const { todos } = data;

  return (
    <ul className="flex flex-col gap-8">
      {todos.map((todo) => (
        <li key={todo.id} className="text-sm">
          <div className="flex items-center justify-between">
            <RecentlyTodoCheckbox todo={todo} />
            <TodoDropdown todo={todo} />
          </div>
          {todo.goalInformation && (
            <Goal goal={todo.goalInformation} isDone={todo.isDone} />
          )}
        </li>
      ))}
    </ul>
  );
}
