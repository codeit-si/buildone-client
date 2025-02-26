import sleep from "@/utils/sleep";

import mockData from "./mock";

export const GET = async () => {
  await sleep(1);
  const data = mockData();

  return Response.json(data);
};
