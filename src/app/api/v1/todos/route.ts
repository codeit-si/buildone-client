import { NextRequest } from "next/server";

import sleep from "@/utils/sleep";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockTodoData = (goalId: any, cursor = 0, size = 10, done = false) => {
  const totalCount = 12;

  return {
    paginationInformation: {
      nextCursor: cursor + size < totalCount ? cursor + size : 0, // 예제에서는 최대 100개 데이터로 가정
      totalCount, // 전체 데이터 개수 가정
      hasNext: cursor + size < totalCount,
    },
    todos: Array.from(
      { length: size + cursor > totalCount ? totalCount - cursor : size },
      (_, index) => {
        const id = cursor + index + 1;
        return {
          id,
          noteId: 0,
          title: `react 처음부터 끝까지 끝내기 ${id}`,
          goalInformation: {
            id: goalId,
            title: `목표 ${goalId}`,
          },
          linkUrl: "https://example.com",
          fileUrl: "https://s3.apnortheast.com/",
          isDone: done,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      },
    ),
  };
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const goalId = Number(searchParams.get("goalId"));
  const cursor = Number(searchParams.get("cursor")) || 0;
  const size = Number(searchParams.get("size")) || 5;
  const done = searchParams.get("done") === "true";
  await sleep(1);

  const data = mockTodoData(goalId, cursor, size, done);

  if (!data) {
    return Response.json({
      paginationInformation: {
        nextCursor: 0,
        totalCount: 0,
        hasNext: false,
      },
      todos: [],
    });
  }
  return Response.json(data);
};
