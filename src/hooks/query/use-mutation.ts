import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote, deleteNote, updateNote } from "@/services/note";
import { noteKeys } from "@/services/query-key";
import {
  NoteCreateRequest,
  NoteResponse,
  NoteUpdateRequest,
} from "@/types/note";

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
      options?.onSuccess?.();
    },
  });
};
