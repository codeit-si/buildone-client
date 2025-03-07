import { queryOptions } from "@tanstack/react-query";

import { noteKeys } from "@/services/query-key";
import { NoteListParams, NoteListResponse } from "@/types/note";

import { getNotesByGoalId } from ".";

export const getNotesByGoalIdOptions = (params: NoteListParams) =>
  queryOptions<NoteListResponse>({
    queryKey: noteKeys.list(params),
    queryFn: () => getNotesByGoalId(params),
  });
