import { NextRequest } from "next/server";

import { Todo, TodoListResponse } from "@/types/todo";
import sleep from "@/utils/sleep";

const getRandomGoal = () =>
  [
    "Complete the project report.",
    "Review the latest code changes.",
    "Update documentation.",
    "Plan for the next sprint.",
  ][Math.floor(Math.random() * 4)];
export const mockFetchTodos = async (
  pageParam = 1,
): Promise<TodoListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 40 }, (_, i) => {
        const id = (pageParam - 1) * 40 + i + 1;
        return {
          id,
          noteId: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : null,
          title: `${pageParam}-${i + 1} ${getRandomGoal()}`,
          goalInformation:
            Math.random() > 0.5
              ? { id: Math.floor(Math.random() * 100), title: getRandomGoal() }
              : null,
          linkUrl:
            Math.random() > 0.5 ? `https://example.com/link-${id}` : null,
          fileUrl:
            Math.random() > 0.5 ? `https://example.com/file-${id}` : null,
          isDone: Math.random() > 0.5,
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 1000000000),
          ).toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      resolve({
        todos,
        paginationInformation: {
          nextCursor: pageParam < 3 ? pageParam + 1 : null, // null로 변경
          totalCount: 120, // 총 개수 추가
          hasNext: pageParam < 3, // Boolean 값 유지
        },
      });
    }, 500);
  });
};

export const GET = async (request: NextRequest) => {
  await sleep(1);

  const pageParam = Number(request.nextUrl.searchParams.get("page")) || 1;

  const data = await mockFetchTodos(pageParam);

  return Response.json({
    todos: data.todos,
    paginationInformation: {
      nextCursor: data.paginationInformation.nextCursor ?? null, // undefined -> null 처리
      totalCount: data.paginationInformation.totalCount,
      hasNext: data.paginationInformation.hasNext,
    },
  });
};
