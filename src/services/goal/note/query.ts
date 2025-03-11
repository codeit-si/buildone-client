import { QueryFunctionContext } from "@tanstack/react-query";

import { noteKeys } from "@/services/query-key";
import { NoteListParams, NoteListResponse } from "@/types/note";

import { getNotesByGoalId } from ".";

export const getNotesByGoalIdOptions = (params: NoteListParams) => ({
  queryKey: noteKeys.list(params),
  queryFn: ({ pageParam = 1 }: QueryFunctionContext) => {
    return getNotesByGoalId({ ...params, page: pageParam as number });
  },
  getNextPageParam: (lastPage: NoteListResponse) => {
    if ((lastPage.notes?.length || 0) < params.size) {
      return null;
    }
    return lastPage.paginationInformation.nextCursor || null;
  },
  initialPageParam: 1,
});

export const getInfiniteNotesByGoalIdOptions = (params: NoteListParams) => ({
  queryKey: noteKeys.list(params),
  queryFn: ({ pageParam = 1 }): Promise<NoteListResponse> =>
    getNotesByGoalId({ ...params, page: pageParam }),
  getNextPageParam: (lastPage: NoteListResponse) =>
    lastPage.paginationInformation.nextCursor || null,
  initialPageParam: 1,
});
