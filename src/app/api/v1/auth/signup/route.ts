export async function POST(request: Request) {
  const { email } = await request.json();

  if (email === "test@test.com") {
    return new Response(
      JSON.stringify({
        code: "ALREADY_EXIST_MEMBER_WITH_DUPLICATED_EMAIL",
        message: "이미 사용 중인 이메일입니다.",
      }),
      {
        status: 409,
      },
    );
  }

  return new Response(
    JSON.stringify({
      id: 1,
      email: "test@test.com",
      name: "김경식",
    }),
    {
      status: 200,
    },
  );
}
