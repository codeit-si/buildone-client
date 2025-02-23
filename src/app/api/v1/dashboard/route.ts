import sleep from "@/app/sleep";

import mockData from "./mock";

export async function GET() {
  await sleep(1);
  const data = mockData();

  return Response.json(data);
}
