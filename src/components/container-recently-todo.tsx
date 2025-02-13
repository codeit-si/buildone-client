"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import NoteIcon from "@/assets/note.svg";
import RecentlyIcon from "@/assets/recently.svg";

interface Todo {
  id: string;
  title: string;
  status: "todo" | "done";
  hasNote: string | null;
  hasLink: boolean;
  hasFile: boolean;
  createdAt: number; // 타임스탬프 추가
}
interface TodosResponse {
  todos: Todo[];
  nextCursor?: string;
}
interface ListTodoProps {
  fetchTodos?: () => Promise<{ todos: Todo[] }>;
  status: "todo" | "done";
}
interface BaseTodoProps {
  index: number;
  todo: Todo;
}
interface TodoTitleAndCheckBoxProps extends BaseTodoProps {
  toggleStatus: (id: string) => void;
}
interface NoteProps {
  todo: Todo;
}
const notes = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quod.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  "orem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur.",
];
const getRandomNote = () => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};

const mockFetchTodos = async () => {
  return new Promise<{ todos: Todo[] }>((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 10 }, (_, i) => ({
        id: `todo-${i}`,
        title: `${i + 1} ${getRandomNote()}`,
        status: Math.random() > 0.5 ? "todo" : "done",
        hasNote: Math.random() > 0.5 ? getRandomNote() : null,
        hasLink: Math.random() > 0.5,
        hasFile: Math.random() > 0.5,
        createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      }));
      resolve({ todos });
    }, 500);
  });
};
const TodoTitleAndCheckBox = ({
  index,
  todo,
  toggleStatus,
}: TodoTitleAndCheckBoxProps) => {
  const isDone = todo.status === "done";
  return (
    <div className="flex items-center gap-10">
      <label
        htmlFor={`todo-check-${index}`}
        className="relative flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          id={`todo-check-${index}`}
          checked={isDone}
          onChange={() => toggleStatus(todo.id)}
          className="peer absolute hidden"
        />
        {isDone ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </label>
      <span className={`${isDone ? "line-through" : ""}`}>{todo.title}</span>
    </div>
  );
};

const Note = ({ todo }: NoteProps) => {
  if (!todo.hasNote) return;
  return (
    <div className="ml-27 mt-10 flex items-center gap-10 text-slate-700">
      <NoteIcon />
      <p className={`${todo.status === "done" ? "line-through" : ""}`}>
        {todo.hasNote}
      </p>
    </div>
  );
};

export default function ContainerRecentlyTodo({
  fetchTodos = mockFetchTodos,
  status,
}: ListTodoProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<TodosResponse>({
    queryKey: ["todos", status],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류 발생</p>;

  const recentTodos = [...(data?.todos ?? [])]
    .sort((a, b) => b.createdAt - a.createdAt) // 최신순 정렬
    .slice(0, 4); // 상위 4개만 선택
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
    <div className="mx-auto flex h-250 w-full max-w-2xl flex-col justify-between rounded-xl border-slate-300 bg-slate-50 px-25 py-15 text-sm text-slate-800">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <RecentlyIcon />
          <h2 className="text-lg font-bold">최근 등록된 할 일</h2>
        </div>
        <Link className="text-mb text-slate-600" href="/todos">
          모두 보기 {">"}
        </Link>
      </div>
      <div className="mb-10 h-154 overflow-hidden overflow-y-auto">
        {recentTodos.length === 0 ? (
          <p>아직 해야 할 일이 없어요</p>
        ) : (
          <ul className="space-y-15 pb-20">
            {recentTodos.map((todo, index) => (
              <li key={todo.id} className="flex flex-col">
                <TodoTitleAndCheckBox
                  index={index}
                  todo={todo}
                  toggleStatus={toggleStatus}
                />
                <Note todo={todo} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
