export const POST = async (request: Request) => {
  const { refreshToken } = await request.json();

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `ACCESS_TOKEN=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};
