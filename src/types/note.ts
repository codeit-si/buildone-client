export interface Note {
  id: number;
  title: string;
  content: string;
  linkUrl: string;
  tags: string[];
  goalInformation: {
    id: number;
    title: string;
  };
  todoInformation: {
    id: number;
    title: string;
    linkUrl: string;
    fileUrl: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NoteListResponse {
  paginationInformation: {
    nextCursor: number;
    totalCount: number;
    hasNext: boolean;
  };
  notes: Note[];
}

export interface NoteListParams {
  goalId: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}
