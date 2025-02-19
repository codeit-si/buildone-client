import { NextRequest } from "next/server";

import sleep from "@/app/sleep";
import { GoalListParams, GoalListResponse } from "@/types/dashboard";

const generateMockGoals = ({
  cursor = 0,
  size = 10,
}: GoalListParams & { cursor?: number }): GoalListResponse => {
  const totalGoals = 5; // 전체 데이터 개수
  const hasNext = cursor + size < totalGoals;

  const goals = Array.from(
    { length: Math.min(size, totalGoals - cursor) },
    (_, index) => {
      const id = cursor + index + 1;
      return {
        id,
        title: `Goal ${id}`,
        createdAt: new Date(Date.now() - id * 1000000),
        updatedAt: new Date(Date.now() - id * 500000),
      };
    },
  );

  return {
    paginationInformation: {
      nextCursor: hasNext ? cursor + size : cursor,
      totalCount: totalGoals,
      hasNext,
    },
    goals,
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const cursor = Number(searchParams.get("cursor")) || 0;
  const size = Number(searchParams.get("size")) || 3;
  await sleep(1);

  const data = generateMockGoals({ cursor, size });

  return Response.json(data);
}
