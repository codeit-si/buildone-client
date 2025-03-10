"use client";

import { useEffect, useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import PlusIcon from "@/assets/icons-small/plus/plus_db_sm.svg";
import Todo from "@/components/@common/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getInfiniteTodosByGoalIdOptions } from "@/services/todo/query";

import Filter from "../@common/filter";
import TodoModal from "../@common/todo-modal/todo-modal";

export default function AllListTodo() {
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatedTodoIds, setAnimatedTodoIds] = useState(new Set());

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

  useEffect(() => {
    const newIds = todos
      .filter((todo) => !animatedTodoIds.has(todo.id))
      .map((todo) => todo.id);

    if (newIds.length > 0) {
      setAnimatedTodoIds((prev) => new Set([...prev, ...newIds]));
    }
  }, [todos, animatedTodoIds]);

  return (
    <>
      <div className="mb-16 mt-24 flex items-center justify-between">
        <h2 className="text-18 font-semibold text-slate-900">{`모든 할 일 (${todos?.length})`}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 font-semibold text-dark-blue-600"
        >
          <PlusIcon />
          <span className="text-14/3">할일 추가</span>
        </button>
      </div>
      <div className="mb-16 min-h-[calc(100vh-131px)] w-full rounded-xl border-slate-300 bg-white p-16 text-sm text-slate-800 md:min-h-[calc(100vh-91px)] md:p-24 lg:mb-24 lg:p-24">
        <Filter filter={filter} setFilter={setFilter} />
        <ul className="flex flex-col gap-8">
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
