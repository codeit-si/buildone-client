"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import PlusIcon from "@/assets/plus/plus_db_sm.svg";
import ListTodo from "@/components/@common/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { getTodos } from "@/services/todos";
import { Todo, TodoListResponse } from "@/types/todo";

import Filter from "../@common/filter";

/* const getRandomGoal = () =>
  [
    "Complete the project report.",
    "Review the latest code changes.",
    "Update documentation.",
    "Plan for the next sprint.",
  ][Math.floor(Math.random() * 4)];

const mockFetchTodos = async (
  pageParam = 1,
): Promise<{ todos: Todo[]; nextPage?: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 40 }, (_, i) => ({
        id: pageParam * 100 + i,
        noteId: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : null, // 50% 확률로 null
        title: `${pageParam}-${i + 1} ${getRandomGoal()}`,
        goalInformation:
          Math.random() > 0.5
            ? {
                id: Math.floor(Math.random() * 100),
                title: getRandomGoal(),
              }
            : null,
        linkUrl:
          Math.random() > 0.5
            ? `https://example.com/link-${pageParam}-${i}`
            : null, // 50% 확률로 null
        fileUrl:
          Math.random() > 0.5
            ? `https://example.com/file-${pageParam}-${i}`
            : null, // 50% 확률로 null
        isDone: Math.random() > 0.5,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 10000000),
        ).toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
    }, 500);
  });
}; */

export default function AllListTodo() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

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
        <button className="flex items-center gap-3 font-semibold text-dark-blue-600">
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
    </>
  );
}
