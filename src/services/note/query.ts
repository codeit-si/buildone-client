// src/services/note/query.ts
import { queryOptions } from "@tanstack/react-query";

import { NoteResponse } from "@/types/note";

import { getNote } from ".";

export const getNoteOptions = (noteId: number) =>
  queryOptions<NoteResponse>({
    queryKey: ["noteDetail", noteId],
    queryFn: () => getNote(noteId),
  });
