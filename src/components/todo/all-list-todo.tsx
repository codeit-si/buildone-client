"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

import PlusIcon from "@/assets/plus/plus_db_sm.svg";
import ListTodo from "@/components/@common/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import getQueryClient from "@/lib/get-query-client";
import { getTodos } from "@/services/todos";
import { Todo, TodoListResponse } from "@/types/todo";

import Filter from "../@common/filter";

import TodoCreateModal from "./todo-create-modal";

export default function AllListTodo() {
  const queryClient = getQueryClient();
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
  }: InfiniteQueryObserverResult<InfiniteData<TodoListResponse>> =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: ({ pageParam = 1 }) => getTodos(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.paginationInformation.hasNext
          ? lastPage.paginationInformation.nextCursor
          : undefined;
      },
      initialPageParam: 1,
    });

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const toggleStatus = (id: number) => {
    queryClient.setQueryData<
      InfiniteData<{ todos: Todo[]; nextPage?: number }>
    >(["todos"], (oldData) => {
      if (!oldData) return oldData;

      const clonedData = structuredClone(oldData);
      clonedData.pages = clonedData.pages.map((page) => ({
        ...page,
        todos: page.todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
        ),
      }));

      return clonedData;
    });
  };

  const todos = data.pages
    .flatMap((page) => page.todos)
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "done") return todo.isDone === true;
      if (filter === "todo") return todo.isDone === false;
      return true;
    })
    .slice(0, 40);

  return (
    <>
      <div className="mb-16 mt-24 flex items-center justify-between">
        <h2 className="text-18 font-semibold text-slate-600">{`모든 할 일 (${todos.length})`}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 font-semibold text-dark-blue-600"
        >
          <PlusIcon />
          <span className="text-14/3">할일 추가</span>
        </button>
      </div>
      <div className="min-h-[2080px] w-full rounded-xl rounded-b-none border-slate-300 bg-white p-20 text-sm text-slate-800">
        <Filter filter={filter} setFilter={setFilter} />
        <ul className="flex flex-col gap-20">
          {todos.map((todo, index) => (
            <ListTodo
              key={todo.id}
              index={index}
              todo={todo}
              toggleStatus={toggleStatus}
              showDropdownOnHover // 드롭다운 호버 여부
              showGoal // 목표 보여주기 여부
            />
          ))}
        </ul>
        <div ref={ref} className="h-1" />
      </div>
      {isModalOpen && <TodoCreateModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
