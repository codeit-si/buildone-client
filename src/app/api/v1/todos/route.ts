import { NextRequest, NextResponse } from "next/server";

import { GoalInformation, Todo } from "@/types/todo";

const getRandomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

const getRandomTitle = (): string => {
  const titles = [
    "Complete the project report",
    "Review the latest code changes",
    "Update documentation",
    "Fix UI bug in dashboard",
    "Implement authentication feature",
    "Optimize database queries",
    "Write unit tests",
    "Deploy new version to production",
    "Refactor old codebase",
    "Research new tech stack",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomGoal = (): GoalInformation => {
  const goals = [
    { id: 1, title: "Improve team productivity" },
    { id: 2, title: "Enhance security measures" },
    { id: 3, title: "Refactor core modules" },
    { id: 4, title: "Reduce server downtime" },
    { id: 5, title: "Increase test coverage" },
  ];
  return goals[Math.floor(Math.random() * goals.length)];
};

const generateRandomTodos = (count: number): Todo[] => {
  return Array.from({ length: count }, (_, i) => {
    const createdAt = getRandomDate(100);
    const updatedAt = getRandomDate(10);

    return {
      id: i + 1,
      noteId: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 1 : null,
      title: getRandomTitle(),
      goalInformation: Math.random() > 0.5 ? getRandomGoal() : null,
      linkUrl: Math.random() > 0.5 ? "https://example.com/resource" : null,
      fileUrl: Math.random() > 0.5 ? "https://example.com/file.pdf" : null,
      isDone: Math.random() > 0.5,
      createdAt,
      updatedAt,
    };
  });
};

export const todos: Todo[] = generateRandomTodos(120);

export const GET = async (request: NextRequest) => {
  const pageParam = Number(request.nextUrl.searchParams.get("page")) || 1;
  const pageSize = Number(request.nextUrl.searchParams.get("pageSize")) || 40;

  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedTodos = todos.slice(startIndex, endIndex);

  const totalCount = todos.length;
  const hasNext = endIndex < totalCount;
  const nextCursor = hasNext ? pageParam + 1 : null;

  return NextResponse.json({
    todos: pagedTodos,
    paginationInformation: { nextCursor, totalCount, hasNext },
  });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  if (!body.title)
    return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const newTodo: Todo = {
    id: Date.now(),
    noteId: body.noteId ?? null,
    title: body.title,
    goalInformation: body.goalInformation ?? null,
    linkUrl: body.linkUrl ?? null,
    fileUrl: body.fileUrl ?? null,
    isDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.unshift(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
};
