export const GET = async (
  request: Request,
  { params }: { params: { goalId: string } },
) => {
  if (params.goalId === "2") {
    return new Response(
      JSON.stringify({
        code: "NOT_FOUND_GOAL",
        message: "목표를 찾을 수 없습니다.",
      }),
      {
        status: 404,
      },
    );
  }

  return new Response(
    JSON.stringify({
      id: 1,
      title: "자바스크립트로 웹 만들기",
      createdAt: "2025-02-25T08:56:04.367Z",
      updatedAt: "2025-02-25T08:56:04.367Z",
    }),
    {
      status: 200,
    },
  );
};
