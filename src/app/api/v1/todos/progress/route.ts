import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const goalId = Number(request.nextUrl.searchParams.get("goalId"));

  if (!goalId) {
    return Response.json(
      {
        code: "INVALID_TODO_PK",
        message: "Todo ID가 올바르지 않습니다.",
      },
      {
        status: 400,
      },
    );
  }
  return Response.json({ progress: (Math.random() * 100).toFixed(0) });
};
