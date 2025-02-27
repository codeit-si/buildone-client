export interface GoalSimpleResponse {
  id: number;
  title: string;
}

export interface TodoResponse {
  id: number;
  noteId: number | null;
  title: string;
  goalInformation: GoalSimpleResponse;
  linkUrl?: string;
  fileUrl?: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoListResponse {
  paginationInformation: {
    nextCursor: number;
    totalCount: number;
  };
  todos: TodoResponse[];
}

export interface DashboardResponse {
  progress: number;
  todos: TodoResponse[];
}

export interface GoalResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
