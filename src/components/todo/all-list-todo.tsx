"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import ListTodo from "@/components/@common/todo";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Todo } from "@/types/todo";

import Filter from "../@common/filter";

const getRandomGoal = () =>
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
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
        updatedAt: new Date(),
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
    }, 500);
  });
};

interface ListTodoComponentProps {
  fetchTodos?: (
    pageParam: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
  maxItems?: number; // 할 일 최대 개수 제한
}

export default function AllListTodo({
  fetchTodos = mockFetchTodos,
  maxItems,
}: ListTodoComponentProps) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
  }: InfiniteQueryObserverResult<
    InfiniteData<{ todos: Todo[]; nextPage?: number }>
  > = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
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
    .slice(0, maxItems);

  return (
    <div className="mx-auto min-h-[2080] w-full max-w-2xl rounded-xl rounded-b-none border-slate-300 bg-white p-20 text-sm text-slate-800">
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
  );
}
