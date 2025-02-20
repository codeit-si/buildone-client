"use client";

import { useState } from "react";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import FileIcon from "@/assets/file.svg";
import LinkIcon from "@/assets/link.svg";
import NoteIcon from "@/assets/note.svg";
import Goal from "@/containers/container-recently-todo/Goal";
import TodoTitleAndCheckBox from "@/containers/container-recently-todo/TodoTitleAndCheckBox";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { DropdownItem, Todo, TodosResponse } from "@/types/todo";

import Dropdown from "./dropdown";

const getRandomGoal = () =>
  [
    "Complete the project report.",
    "Review the latest code changes.",
    "Update documentation.",
    "Plan for the next sprint.",
  ][Math.floor(Math.random() * 4)];

const mockFetchTodos = async (pageParam = 1) => {
  return new Promise<{ todos: Todo[]; nextPage?: number }>((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 40 }, (_, i) => ({
        id: `todo-${pageParam}-${i}`,
        title: `${pageParam}-${i + 1} ${getRandomGoal()}`,
        status: Math.random() > 0.5 ? "todo" : "done",
        hasGoal: Math.random() > 0.5 ? getRandomGoal() : null,
        hasLink: Math.random() > 0.5,
        hasFile: Math.random() > 0.5,
        hasNote: Math.random() > 0.5,
        createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
    }, 500);
  });
};

interface ListTodoComponentProps {
  fetchTodos?: (
    pageParam: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
  maxItems: number; // 할 일 최대 개수 제한
  showDropdownOnHover: boolean; // 호버 시 Dropdown 표시 여부
}

export default function ListTodoComponent({
  fetchTodos = mockFetchTodos,
  maxItems = 40,
  showDropdownOnHover,
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
  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const toggleStatus = (id: string) => {
    queryClient.setQueryData<InfiniteData<TodosResponse>>(
      ["todos", filter],
      (oldData) => {
        if (!oldData) return oldData;
        const clonedData = structuredClone(oldData);
        clonedData.pages = clonedData.pages.map((page) => ({
          ...page,
          todos: page.todos.map((todo) =>
            todo.id === id
              ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
              : todo,
          ),
        }));
        return clonedData;
      },
    );
  };

  const getDropdownItems = (todo: Todo): DropdownItem[] => {
    const baseItems: DropdownItem[] = [
      { id: "edit", label: "수정하기", onClick: () => {} },
      { id: "delete", label: "삭제하기", onClick: () => {} },
    ];
    if (todo.hasNote) {
      return [
        { id: "note", label: "노트보기", onClick: () => {} },
        ...baseItems,
      ];
    }
    return baseItems;
  };

  // 필터링된 todos 리스트
  const todos = data.pages
    .flatMap((page) => page.todos)
    .filter((todo) => filter === "all" || todo.status === filter)
    .slice(0, maxItems) // maxItems 개수로 제한
    .map((todo) => ({
      ...todo,
      dropdownItems: getDropdownItems(todo),
    }));

  const iconSpread = (todo: Todo) => {
    const keys = ["file", "link", "note"] as const;
    return keys
      .filter(
        (key) =>
          todo[
            `has${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof Todo
          ],
      )
      .map((key) => (
        <a key={key} href={`/${key}s/${todo.id}`}>
          {key === "file" ? (
            <FileIcon />
          ) : key === "link" ? (
            <LinkIcon />
          ) : (
            <NoteIcon />
          )}
        </a>
      ));
  };

  return (
    <>
      <ul className="mt-20 flex flex-col gap-15 bg-white">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="group relative text-slate-800 hover:text-purple-700"
          >
            <div className="flex items-center justify-between">
              <TodoTitleAndCheckBox
                index={index}
                todo={todo}
                toggleStatus={toggleStatus}
              />
              <div className="absolute right-0 top-0 flex gap-5 text-slate-700">
                {iconSpread(todo)}
                {/* Dropdown 표시 여부 결정 */}
                <div
                  className={`${showDropdownOnHover && "hidden group-hover:block"}`}
                >
                  <Dropdown items={todo.dropdownItems} />
                </div>
              </div>
            </div>
            <Goal todo={todo} />
          </li>
        ))}
      </ul>
      {/* todos 갯수가 40개 이상이면 옵저버 바닥 나오게 해서 무한 스크롤 구현 */}
      {todos.length >= 40 && <div ref={ref} className="h-1" />}
    </>
  );
}
