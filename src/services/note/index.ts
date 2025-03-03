import api from "@/lib/axios";
import { Note } from "@/types/note";

export const getNote = async (noteId: number): Promise<Note> => {
  const { data } = await api.get<Note>(`/api/v1/notes/${noteId}`);
  return data;
};
