"use client";

import { useState } from "react";

import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  InfiniteData,
  useQueryClient,
} from "@tanstack/react-query";

import CheckBoxOffIcon from "@/assets/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/checkbox_on.svg";
import FileIcon from "@/assets/file.svg";
import GoalIcon from "@/assets/goal.svg";
import KebabIcon from "@/assets/kebab.svg";
import LinkIcon from "@/assets/link.svg";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface Todo {
  id: string;
  title: string;
  status: "todo" | "done";
  hasGoal: string | null;
  hasLink: boolean;
  hasFile: boolean;
}
interface TodosResponse {
  todos: Todo[];
  nextCursor?: string;
}
interface ListTodoProps {
  fetchTodos?: (
    pageParam?: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
}
interface BaseTodoProps {
  index: number;
  todo: Todo;
}
interface TodoTitleAndCheckBoxProps extends BaseTodoProps {
  toggleStatus: (id: string) => void;
}
interface TodoEditAndDeleteAndIconsProps extends BaseTodoProps {
  activeKebab: number | null;
  handleKebabClick: (index: number) => void;
}
interface GoalProps {
  todo: Todo;
}

const goals = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quod.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  "orem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur.",
];
const getRandomGoal = () => {
  const randomIndex = Math.floor(Math.random() * goals.length);
  return goals[randomIndex];
};
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
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
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
const TodoEditAndDeleteAndIcons = ({
  todo,
  index,
  activeKebab,
  handleKebabClick,
}: TodoEditAndDeleteAndIconsProps) => {
  return (
    <div className="flex items-center gap-15">
      {todo.hasLink && <LinkIcon />}
      {todo.hasFile && <FileIcon />}
      <div className="relative h-24">
        <button onClick={() => handleKebabClick(index)}>
          <KebabIcon />
        </button>
        <div
          className={`${activeKebab !== index ? "hidden" : "flex"} absolute -left-60 z-10 w-80 flex-col items-center gap-10 rounded-lg bg-[#fff] p-10 shadow-md`}
        >
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
const Goal = ({ todo }: GoalProps) => {
  if (!todo.hasGoal) return;
  return (
    <div className="ml-30 mt-10 flex items-center gap-10 text-slate-700">
      <GoalIcon />
      <p className={`${todo.status === "done" ? "line-through" : ""}`}>
        {todo.hasGoal}
      </p>
    </div>
  );
};
export default function ListTodo({
  fetchTodos = mockFetchTodos,
}: ListTodoProps) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [activeKebab, setActiveKebab] = useState<null | number>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    error,
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

  // 로딩 상태 처리
  if (isPending) return <div>Loading...</div>;

  // 에러 상태 처리
  if (isError) return <div>Error: {error.message}</div>;

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

  const filteredTodos = data.pages
    .flatMap((page) => page.todos)
    .filter((todo) => filter === "all" || todo.status === filter);

  const statusLabels = {
    all: "All",
    todo: "To do",
    done: "Done",
  } as const;

  const statusMap = (["all", "todo", "done"] as const).map((status) => (
    <li
      key={status}
      className={`${
        status === filter
          ? "border-dark-blue-500 bg-dark-blue-500 text-slate-50"
          : ""
      } cursor-pointer rounded-3xl border`}
    >
      <button
        className="h-full w-full px-10 py-2"
        onClick={() => setFilter(status)}
      >
        {statusLabels[status]}
      </button>
    </li>
  ));

  const handleKebabClick = (index: number) =>
    setActiveKebab((prev) => (prev === index ? null : index));

  return (
    <div className="mx-auto min-h-[2080px] w-full max-w-2xl rounded-xl rounded-b-none border-slate-300 bg-[#fff] p-20 text-sm text-slate-800">
      <ul className="mb-20 flex gap-10">{statusMap}</ul>
      <ul className="space-y-15">
        {filteredTodos.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center justify-between">
              <TodoTitleAndCheckBox
                index={index}
                todo={todo}
                toggleStatus={toggleStatus}
              />
              <TodoEditAndDeleteAndIcons
                activeKebab={activeKebab}
                handleKebabClick={handleKebabClick}
                index={index}
                todo={todo}
              />
            </div>
            <Goal todo={todo} />
          </li>
        ))}
      </ul>
      <div ref={ref} className="h-[.5px]" />
    </div>
  );
}
