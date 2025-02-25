import { Todo, TodoListResponse } from "@/types/todo";

import { ENDPOINT } from "../endpoint";

export const getTodos = async (
  pageParam: number,
): Promise<TodoListResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}${ENDPOINT.TODO.GET_ALL}?page=${pageParam}`,
  );
  return response.json();
};

export const createTodo = async (newTodo: Todo) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}${ENDPOINT.TODO.CREATE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    },
  );
  if (!response.ok)
    throw new Error(`할 일 목록을 가져오는데 실패했습니다: ${response.status}`);
  return response.json();
};
