import { GoalSimpleResponse } from "./goal";

export interface NoteListParams {
  goalId: number;
  size: number;
}

export interface NoteCreateRequest {
  todoId: number;
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
}

export interface NoteUpdateRequest {
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
}

export interface TodoForNoteResponse {
  id: number;
  title: string;
  linkUrl: string;
  fileUrl: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
  goalInformation: GoalSimpleResponse;
  todoInformation: TodoForNoteResponse;
  createdAt: string;
  updatedAt: string;
}

export interface NoteListResponse {
  notes: NoteResponse[];
  paginationInformation: {
    nextCursor?: number;
  };
}
