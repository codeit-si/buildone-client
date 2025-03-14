// src/services/note/query.ts
import { queryOptions } from "@tanstack/react-query";

import { noteKeys } from "@/services/query-key";
import { NoteResponse } from "@/types/note";

import { getNote } from ".";

export const getNoteOptions = (noteId: number) =>
  queryOptions<NoteResponse>({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => getNote(noteId),
  });
