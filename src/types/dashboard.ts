import { GoalSimpleResponse } from "./goal";

export interface TodoResponse {
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

export interface GoalListParams {
  cursor?: number;
  size?: number;
  sortOrder?: "newest" | "oldest";
  moreKeys?: string[];
}

export interface TodosByGoalParams {
  goalId: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}
