import { useQuery } from "@tanstack/react-query";

import { getNotesByGoalIdOptions } from "@/services/goal/note/query";
import { getNote } from "@/services/note";
import { noteKeys } from "@/services/query-key";
import { NoteListParams, NoteResponse } from "@/types/note";

export const useNotesByGoalId = (params: NoteListParams) => {
  return useQuery({
    ...getNotesByGoalIdOptions(params),
  });
};

export const useNoteDetail = (noteId: number | null) => {
  return useQuery<NoteResponse>({
    queryKey: noteId ? noteKeys.detail(noteId) : ["notes", "detail", "empty"],
    queryFn: () => {
      if (!noteId) throw new Error("noteId가 필요합니다.");
      return getNote(noteId);
    },
    enabled: Boolean(noteId),
    retry: false,
  });
};
