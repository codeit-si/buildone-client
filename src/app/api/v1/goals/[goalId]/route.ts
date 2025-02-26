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
