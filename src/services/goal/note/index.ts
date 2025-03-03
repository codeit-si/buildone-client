import api from "@/lib/axios";
import { NoteListParams, NoteListResponse } from "@/types/note";

export const getNotesByGoalId = async ({
  goalId,
  cursor,
  size,
}: NoteListParams): Promise<NoteListResponse> => {
  const url = `/api/v1/notes`; // 나중에 따로 빼주기
  const { data } = await api.get<NoteListResponse>(url, {
    params: { cursor, size, goalId },
  });
  return data;
};
