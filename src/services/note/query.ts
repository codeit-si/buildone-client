// src/services/note/query.ts
import { queryOptions } from "@tanstack/react-query";

import { Note } from "@/types/note";

import { getNote } from ".";

export const getNoteOptions = (noteId: number) =>
  queryOptions<Note>({
    queryKey: ["noteDetail", noteId],
    queryFn: () => getNote(noteId),
  });
