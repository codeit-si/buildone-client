import { NextRequest, NextResponse } from "next/server";

import { TodoResponse } from "@/types/todo";

import { todos } from "./generate-random-todos";

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

  const newTodo: TodoResponse = {
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
