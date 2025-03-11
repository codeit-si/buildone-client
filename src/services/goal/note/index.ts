import api from "@/lib/axios";
import { ENDPOINT } from "@/services/endpoint";
import { NoteListResponse } from "@/types/note";

export const getNotesByGoalId = async ({
  goalId,
  size,
  page,
}: {
  goalId: number;
  size: number;
  page: number;
}): Promise<NoteListResponse> => {
  const { data } = await api.get<NoteListResponse>(ENDPOINT.NOTES.LIST, {
    params: { goalId, size, page },
  });
  return data;
};
