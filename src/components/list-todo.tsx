"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Todo } from "@/types/todo";

import ListTodoComponent from "../containers/todo/list-todo-component";

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
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 10000000),
        ).toISOString(),
        updatedAt: new Date().toISOString(),
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

export default function ListTodo({
  fetchTodos = mockFetchTodos,
  maxItems,
}: ListTodoComponentProps) {
  const queryClient = useQueryClient();
  const [filter] = useState<"all" | "todo" | "done">("all");

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
    <>
      <ul className="mt-20 flex flex-col gap-15 bg-white">
        {todos.map((todo, index) => (
          <ListTodoComponent
            key={todo.id}
            index={index}
            todo={todo}
            toggleStatus={toggleStatus}
            showDropdownOnHover // 드롭다운 호버 여부
            showGoal // 목표 보여주기 여부
          />
        ))}
      </ul>
      {todos.length >= 40 && <div ref={ref} className="h-1" />}
    </>
  );
}
