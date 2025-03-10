import { users } from "../mock";

export const POST = async (request: Request) => {
  const { name, email, password } = await request.json();

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

  const newUserId = users.length + 1;

  users.push({
    id: newUserId,
    email,
    name,
    password,
  });

  return new Response(
    JSON.stringify({
      id: newUserId,
      email,
      name,
    }),
    {
      status: 200,
    },
  );
};
