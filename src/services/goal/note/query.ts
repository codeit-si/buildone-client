import { queryOptions } from "@tanstack/react-query";

import { noteKeys } from "@/services/query-key";
import { NoteListParams, NoteListResponse } from "@/types/note";

import { getNotesByGoalId } from ".";

export const getNotesByGoalIdOptions = (params: NoteListParams) =>
  queryOptions<NoteListResponse>({
    queryKey: noteKeys.list(params),
    queryFn: () => getNotesByGoalId({ ...params, page: 1 }),
  });

export const getInfiniteNotesByGoalIdOptions = (params: NoteListParams) => ({
  queryKey: noteKeys.list(params),
  queryFn: ({ pageParam = 1 }): Promise<NoteListResponse> =>
    getNotesByGoalId({ ...params, page: pageParam }),
  getNextPageParam: (lastPage: NoteListResponse) =>
    lastPage.paginationInformation.nextCursor || null,
  initialPageParam: 1,
});
