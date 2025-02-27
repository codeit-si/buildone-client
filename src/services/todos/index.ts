import api from "@/lib/axios";
import { TodoResponse } from "@/types/dashboard";

import { ENDPOINT } from "../endpoint";

type PutTodoParams = {
  goalId?: TodoResponse["goalInformation"]["id"];
  title: TodoResponse["title"];
  fileUrl?: TodoResponse["fileUrl"];
  linkUrl?: TodoResponse["linkUrl"];
  isDone: TodoResponse["isDone"];
};

export const putTodo = async (id: number, editedTodo: PutTodoParams) => {
  const { data } = await api.put<TodoResponse>(
    ENDPOINT.TODO.UPDATE(id),
    editedTodo,
  );
  return data;
};

export const postTodo = async (newTodo: Omit<PutTodoParams, "isDone">) => {
  const { data } = await api.post<TodoResponse>(ENDPOINT.TODO.POST, newTodo);
  return data;
};
