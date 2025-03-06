import api from "@/lib/axios";
import { NoteListParams, NoteListResponse } from "@/types/note";

import { ENDPOINT } from "../../endpoint";

export const getNotesByGoalId = async ({
  goalId,
  cursor,
  size,
}: NoteListParams): Promise<NoteListResponse> => {
  const { data } = await api.get<NoteListResponse>(ENDPOINT.NOTES.LIST, {
    params: { cursor, size, goalId },
  });
  return data;
};
