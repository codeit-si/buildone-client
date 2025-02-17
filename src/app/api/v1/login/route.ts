export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "test@test.com" && password === "1234") {
    return new Response(
      JSON.stringify({
        memberInformation: {
          id: 1,
          email: "test@test.com",
          name: "김경식",
        },
        credentials: {
          accessToken: "access_token_abcd_64",
          accessTokenExpiredTime: "2025-02-17T02:24:18.954Z",
          refreshToken: "HTTP_ONLY_REFRESH",
        },
      }),
      {
        status: 200,
      },
    );
  }

  // 비밀번호가 올바르지 않은 경우
  if (email === "test@test.com") {
    return new Response(
      JSON.stringify({
        code: "INVALID_PASSWORD_FORMAT",
        message: "비밀번호가 올바르지 않습니다.",
      }),
      {
        status: 400,
      },
    );
  }

  // 존재하지 않는 회원인 경우
  return new Response(
    JSON.stringify({
      code: "NOT_FOUND_EXIST_MEMBER",
      message: "가입되지 않은 이메일입니다.",
    }),
    {
      status: 404,
    },
  );
}
