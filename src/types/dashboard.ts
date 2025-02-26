export interface WithClassName {
  className?: string;
}

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
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  paginationInformation: {
    nextCursor: number;
    totalCount: number;
    hasNext: boolean;
  };
  todos: TodoResponse[];
}

export interface DashboardResponse {
  progress: number;
  todos: TodoResponse[];
}

export interface CommonPaginationInformationResponse {
  nextCursor: number;
  totalCount: number;
  hasNext: boolean;
}

export interface GoalResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalListParams {
  cursor?: number;
  size?: number;
  sortOrder?: "newest" | "oldest";
}

export interface GoalListResponse {
  paginationInformation: CommonPaginationInformationResponse;
  goals: GoalResponse[];
}

export interface TodosByGoalParams {
  goalId: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}
