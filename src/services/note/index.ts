import api from "@/lib/axios";
import { Note } from "@/types/note";

export const getNote = async (noteId: number): Promise<Note> => {
  const { data } = await api.get<Note>(`/api/v1/notes/${noteId}`); // 나중에 옮기기
  return data;
};

export const updateNote = async (
  noteId: number,
  payload: { title: string; content: string; linkUrl: string; tags: string[] },
): Promise<Note> => {
  const { data } = await api.put<Note>(`/api/v1/notes/${noteId}`, payload); // 나중에 옮기기
  return data;
};

export const deleteNote = async (noteId: number): Promise<void> => {
  await api.delete(`/api/v1/notes/${noteId}`); // 나중에 옮기기
};

export const createNote = async (payload: {
  todoId: number;
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
}): Promise<Note> => {
  const { data } = await api.post<Note>("/api/v1/notes", payload); // 나중에 옮기기
  return data;
};
