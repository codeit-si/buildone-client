"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import PlusIcon from "@/assets/icons-small/plus/plus_db_sm.svg";
import ListTodo from "@/components/@common/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { toggleStatus, useAllTodosInfiniteQuery } from "@/services/todos/query";
import { TodoListResponse } from "@/types/todo";

import Filter from "../@common/filter";

import TodoModal from "./todo-modal";

export default function AllListTodo() {
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
  }: InfiniteQueryObserverResult<InfiniteData<TodoListResponse>> =
    useAllTodosInfiniteQuery();

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const handleToggleStatus = async (id: number) => {
    await toggleStatus(id);
  };

  const todos = data.pages
    .flatMap((page) => page.todos)
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "done") return todo.isDone === true;
      if (filter === "todo") return todo.isDone === false;
      return true;
    })
    .sort((a, b) => {
      const updatedDiff =
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (updatedDiff !== 0) return updatedDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

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
          {todos.map((todo, index) =>
            todos.length !== 0 ? (
              <ListTodo
                key={todo.id}
                index={index}
                todo={todo}
                toggleStatus={handleToggleStatus}
                showDropdownOnHover // 드롭다운 호버 여부
                showGoal // 목표 보여주기 여부
              />
            ) : (
              <p key="no-todos">할 일이 없습니다</p>
            ),
          )}
        </ul>
        {/* 페이지가 남아 있을 경우에만 추가 데이터 요청 */}
        {hasNextPage && <div ref={ref} className="h-1" />}
      </div>
      {isModalOpen && <TodoModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
