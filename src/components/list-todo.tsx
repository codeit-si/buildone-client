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
import {
  DropdownItem,
  ListTodoProps,
  Todo,
  TodosResponse,
} from "@/types/container-recently-todo";

import Dropdown from "./dropdown";
import Filter from "./filter";

const goals = [
  "Complete the project report.",
  "Review the latest code changes.",
  "Update documentation.",
  "Plan for the next sprint.",
];

const getRandomGoal = () => goals[Math.floor(Math.random() * goals.length)];

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

export default function ListTodo({
  fetchTodos = mockFetchTodos,
}: ListTodoProps) {
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
    queryKey: ["todos", filter],
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
    // hasNote가 true이면 "노트보기"를 맨 앞에 추가
    if (todo.hasNote) {
      return [
        { id: "note", label: "노트보기", onClick: () => {} },
        ...baseItems,
      ];
    }
    return baseItems;
  };

  // 필터링된 todos 리스트
  const filteredTodos = data.pages
    .flatMap((page) => page.todos)
    .filter((todo) => filter === "all" || todo.status === filter);

  // 각 todo에 맞는 dropdownItems 생성
  const todosWithDropdown = filteredTodos.map((todo) => ({
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
    <div className="mx-auto min-h-[2080px] w-full max-w-2xl rounded-xl rounded-b-none border-slate-300 bg-[#fff] p-20 text-sm text-slate-800">
      <Filter filter={filter} setFilter={setFilter} />
      <ul className="mt-20 flex flex-col gap-15">
        {todosWithDropdown.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center justify-between">
              <TodoTitleAndCheckBox
                index={index}
                todo={todo}
                toggleStatus={toggleStatus}
              />
              <div className="flex gap-5">
                {iconSpread(todo)}
                <Dropdown items={todo.dropdownItems} />
              </div>
            </div>
            <Goal todo={todo} />
          </li>
        ))}
      </ul>
      <div ref={ref} className="h-1" />
    </div>
  );
}
