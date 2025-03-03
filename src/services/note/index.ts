import api from "@/lib/axios";
import { Note } from "@/types/note";

import { ENDPOINT } from "../endpoint";

export const getNote = async (noteId: number): Promise<Note> => {
  const { data } = await api.get<Note>(ENDPOINT.NOTES.GET_BY_ID(noteId));
  return data;
};

export const updateNote = async (
  noteId: number,
  payload: { title: string; content: string; linkUrl: string; tags: string[] },
): Promise<Note> => {
  const { data } = await api.put<Note>(ENDPOINT.NOTES.UPDATE(noteId), payload);
  return data;
};

export const deleteNote = async (noteId: number): Promise<void> => {
  await api.delete(ENDPOINT.NOTES.DELETE(noteId));
};

export const createNote = async (payload: {
  todoId: number;
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
}): Promise<Note> => {
  const { data } = await api.post<Note>(ENDPOINT.NOTES.CREATE, payload);
  return data;
};
