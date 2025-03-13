import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getNotesByGoalIdOptions } from "@/services/goal/note/query";
import { createNote, deleteNote, getNote, updateNote } from "@/services/note";
import { noteKeys, profileKeys } from "@/services/query-key";
import {
  NoteCreateRequest,
  NoteListParams,
  NoteResponse,
  NoteUpdateRequest,
} from "@/types/note";

export interface NoteListResponse {
  notes: NoteResponse[];
  paginationInformation: {
    nextCursor?: number;
  };
}

export const useInfiniteNotesByGoalId = (params: NoteListParams) => {
  return useInfiniteQuery<NoteListResponse, Error>(
    getNotesByGoalIdOptions(params),
  );
};

export const useNoteDetail = (noteId: number) => {
  return useQuery<NoteResponse>({
    queryKey: noteKeys.detail(noteId),
    queryFn: () => {
      if (!noteId) throw new Error("noteId가 필요합니다.");
      return getNote(noteId);
    },
    enabled: Boolean(noteId),
    retry: false,
  });
};

interface UseCreateOrUpdateNoteParams {
  noteId?: number | null;
  todoId?: number | null;
  isEditMode: boolean;
  onSuccess?: (data: NoteResponse) => void;
}

export const useCreateOrUpdateNote = ({
  noteId,
  todoId,
  isEditMode,
  onSuccess,
}: UseCreateOrUpdateNoteParams) => {
  const queryClient = useQueryClient();

  return useMutation<
    NoteResponse,
    Error,
    NoteCreateRequest | NoteUpdateRequest
  >({
    mutationFn: (data) => {
      if (isEditMode && noteId) {
        return updateNote(noteId, data as NoteUpdateRequest);
      }
      if (!todoId) {
        return Promise.reject(new Error("todoId가 필요합니다."));
      }
      return createNote({ todoId, ...data } as NoteCreateRequest);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      onSuccess?.(data);
    },
  });
};

export const useDeleteNote = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.all });
      queryClient.invalidateQueries({ queryKey: profileKeys.all });

      options?.onSuccess?.();
    },
  });
};
