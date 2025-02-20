"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import Link from "next/link";

import IcArrowDown from "@/assets/ic_arrow_down.svg";
import RecentlyIcon from "@/assets/recently.svg";
import GoalsListComponent from "@/containers/container-recently-todo/goal-list-component";
import { Todo } from "@/types/container-recently-todo";

interface TodosResponse {
  todos: Todo[];
  nextCursor?: string;
}
interface ListTodoProps {
  fetchTodos?: () => Promise<{ todos: Todo[] }>;
  status: "todo" | "done";
}
const Goals = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quod.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  "orem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur.",
];
const getRandomGoal = () => {
  const randomIndex = Math.floor(Math.random() * Goals.length);
  return Goals[randomIndex];
};

const mockFetchTodos = async () => {
  return new Promise<{ todos: Todo[] }>((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 10 }, (_, i) => ({
        id: `todo-${i}`,
        title: `${i + 1} ${getRandomGoal()}`,
        status: Math.random() > 0.5 ? "todo" : "done",
        hasGoal: Math.random() > 0.5 ? getRandomGoal() : null,
        hasLink: Math.random() > 0.5,
        hasFile: Math.random() > 0.5,
        createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      }));
      resolve({ todos });
    }, 500);
  });
};

const ContainerStyle = cva(
  "mx-auto flex h-250 w-full max-w-2xl flex-col justify-between rounded-xl border-slate-300 bg-white px-25 py-15 text-sm text-slate-800",
);

export default function ContainerRecentlyTodo({
  fetchTodos = mockFetchTodos,
  status,
}: ListTodoProps) {
  const queryClient = useQueryClient();
  const { data, isError } = useQuery<TodosResponse>({
    queryKey: ["todos", status],
    queryFn: fetchTodos,
  });

  if (isError)
    return (
      <div className="p-4 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["todos", status] })
          }
          className="ml-2 underline"
        >
          다시 시도
        </button>
      </div>
    );

  const recentTodos = [...(data?.todos ?? [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);
  const toggleStatus = (id: string) => {
    queryClient.setQueryData<TodosResponse>(["todos", status], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        todos: oldData.todos.map((todo) =>
          todo.id === id
            ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
            : todo,
        ),
      };
    });
  };

  return (
    <div className={ContainerStyle()}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <RecentlyIcon />
          <h2 className="text-lg font-bold">최근 등록된 할 일</h2>
        </div>
        <Link className="text-mb flex items-center" href="/todos">
          <span className="text-slate-600">모두 보기</span>
          <span className="-rotate-90">
            <IcArrowDown />
          </span>
        </Link>
      </div>
      <div className="mb-10 h-154 overflow-hidden overflow-y-auto">
        {recentTodos.length === 0 ? (
          <p>아직 해야 할 일이 없어요</p>
        ) : (
          <GoalsListComponent
            recentTodos={recentTodos}
            toggleStatus={toggleStatus}
          />
        )}
      </div>
    </div>
  );
}
