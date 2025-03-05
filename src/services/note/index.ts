import api from "@/lib/axios";
import { NoteResponse } from "@/types/note";

import { ENDPOINT } from "../endpoint";

export const getNote = async (noteId: number): Promise<NoteResponse> => {
  const { data } = await api.get<NoteResponse>(
    ENDPOINT.NOTES.GET_BY_ID(noteId),
  );
  return data;
};

export const updateNote = async (
  noteId: number,
  payload: { title: string; content: string; linkUrl: string; tags: string[] },
): Promise<NoteResponse> => {
  const { data } = await api.put<NoteResponse>(
    ENDPOINT.NOTES.UPDATE(noteId),
    payload,
  );
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
}): Promise<NoteResponse> => {
  const { data } = await api.post<NoteResponse>(ENDPOINT.NOTES.CREATE, payload);
  return data;
};
