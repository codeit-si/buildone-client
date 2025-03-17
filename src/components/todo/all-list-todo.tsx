"use client";

import { useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import Todo from "@/components/todo/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

import Filter from "../@common/filter";
import TodoModal from "../todo-modal/todo-modal";
import TodoModalOpenButton from "../todo-modal/todo-modal-open-button";

export default function AllListTodo() {
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteTodosByGoalIdOptions({ size: 40 }),
  );

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  const todos = data?.todos
    ?.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "done") return todo.isDone === true;
      if (filter === "todo") return todo.isDone === false;
      return true;
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <>
      <div className="mb-16 mt-24 flex items-center justify-between">
        <h2 className="text-18 font-semibold text-slate-900">{`모든 할 일 (${todos?.length})`}</h2>
        <TodoModalOpenButton onClick={() => setIsModalOpen(true)} />
      </div>
      <div className="mb-16 h-[calc(100vh-131px)] w-full overflow-hidden rounded-xl border-slate-300 bg-white p-16 text-sm text-slate-800 md:h-[calc(100vh-91px)] md:p-24 lg:mb-24 lg:p-24">
        <Filter filter={filter} setFilter={setFilter} />
        <ul className="scrollbar flex h-[calc(831px-32px-32px-16px)] flex-col gap-8 overflow-y-auto md:h-[calc(871px-32px-48px-16px)]">
          {todos?.length !== 0 ? (
            todos?.map((todo, index) => (
              <Todo
                key={todo.id}
                index={index}
                todo={todo}
                showDropdownOnHover // 드롭다운 호버 여부
                showGoal // 목표 보여주기 여부
              />
            ))
          ) : (
            <div
              className="flex min-h-[calc(100vh-220px)] w-full items-center justify-center text-center md:min-h-[calc(100vh-200px)]"
              key="no-todos"
            >
              <p>
                {filter === "todo" && "아직 해야 할 일이 없어요"}
                {filter === "done" && "아직 다 한 일이 없어요"}
                {filter === "all" && "할 일이 없어요"}
              </p>
            </div>
          )}
        </ul>
        {/* 페이지가 남아 있을 경우에만 추가 데이터 요청 */}
        {hasNextPage && <div ref={ref} className="h-1" />}
      </div>
      {isModalOpen && (
        <TodoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
}
