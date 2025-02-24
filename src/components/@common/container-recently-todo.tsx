"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import Link from "next/link";

import IcArrowDown from "@/assets/ic_arrow_down.svg";
import RecentlyIcon from "@/assets/recently.svg";
import GoalsListComponent from "@/components/todo/goal-list-component";
import { Todo } from "@/types/todo";

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

const mockFetchTodos = async (
  pageParam = 1,
): Promise<{ todos: Todo[]; nextPage?: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 40 }, (_, i) => ({
        id: pageParam * 100 + i,
        noteId: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : null, // 50% 확률로 null
        title: `${pageParam}-${i + 1} ${getRandomGoal()}`,
        goalInformation: {
          id: Math.floor(Math.random() * 100),
          title: getRandomGoal(),
        },
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
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ) // 날짜 비교 수정
    .slice(0, 4);

  const toggleStatus = (id: number) => {
    queryClient.setQueryData<TodosResponse>(["todos", status], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        todos: oldData.todos.map((todo) =>
          todo.id === id
            ? { ...todo, isDone: !todo.isDone } // isDone 값을 반전시킴
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
