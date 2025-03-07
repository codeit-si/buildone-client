import { GoalSimpleResponse } from "./goal";

interface TodoResponse {
  id: number;
  noteId: number | null;
  title: string;
  goalInformation: GoalSimpleResponse | null;
  linkUrl: string | null;
  fileUrl: string | null;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WithClassName {
  className?: string;
}

export interface DashboardRecentTodoListResponse {
  todos: TodoResponse[];
}

export interface DashboardTodoProgressResponse {
  progress: number;
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

export interface TodosByGoalParams {
  goalId?: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}
