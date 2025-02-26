import { NextRequest } from "next/server";

import { GoalListParams, GoalListResponse } from "@/types/dashboard";
import sleep from "@/utils/sleep";

const generateMockGoals = ({
  cursor = 0,
  size = 10,
}: GoalListParams & { cursor?: number }): GoalListResponse => {
  const totalGoals = 7;
  const hasNext = cursor + size < totalGoals;

  const goals = Array.from(
    { length: Math.min(size, totalGoals - cursor) },
    (_, index) => {
      const id = cursor + index + 1;
      return {
        id,
        title: `Goal ${id}`,
        createdAt: new Date(Date.now() - id * 1000000).toString(),
        updatedAt: new Date(Date.now() - id * 500000).toString(),
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

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const cursor = Number(searchParams.get("cursor")) || 0;
  const size = Number(searchParams.get("size")) || 3;
  await sleep(1);

  const data = generateMockGoals({ cursor, size });

  return Response.json(data);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { goalId: string } },
) => {
  if (params.goalId === "10") {
    return new Response(
      JSON.stringify({
        code: "NOT_ALLOW_REMOVE_GOAL",
        message: "삭제 권한이 없습니다.",
      }),
      {
        status: 403,
      },
    );
  }

  return new Response(null, {
    status: 204,
  });
};
