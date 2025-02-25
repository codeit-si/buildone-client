import { TodoListResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

export const getTodos = async (
  pageParam: number,
): Promise<TodoListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}${ENDPOINT.TODO.GET_ALL}?page=${pageParam}`,
  );
  return response.json();
};

export const createTodo = async (title: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}${ENDPOINT.TODO.CREATE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        isDone: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    },
  );
  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
};
