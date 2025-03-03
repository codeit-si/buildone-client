import { queryOptions } from "@tanstack/react-query";

import { NoteListParams } from "@/types/note";

import { getNotesByGoalId } from "./index";

export const getNotesByGoalIdOptions = (params: NoteListParams) =>
  queryOptions({
    queryKey: ["notes", params.goalId, params.done],
    queryFn: () => getNotesByGoalId(params),
  });
