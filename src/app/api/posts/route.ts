import sleep from "@/utils/sleep";

export const GET = async () => {
  await sleep(4);

  return Response.json("Hello world");
};
