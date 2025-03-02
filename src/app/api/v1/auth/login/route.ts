export const POST = async (request: Request) => {
  const { accessToken } = await request.json();

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `ACCESS_TOKEN=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};
