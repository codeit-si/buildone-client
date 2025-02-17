"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getDashboardOptions } from "@/services/dashboard";

export default function RecentlyTodo() {
  const { data } = useSuspenseQuery(getDashboardOptions());

  return (
    <section>
      <h2>최근 등록한 할 일</h2>
      <ul>
        {data.todos &&
          data.todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </section>
  );
}
