export interface GoalInformation {
  id: number;
  title: string;
}

export interface Todo {
  id: number;
  noteId: number | null;
  title: string;
  goalInformation: GoalInformation | null;
  linkUrl: string | null;
  fileUrl: string | null;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  todos: Todo[];
  nextCursor?: string;
}
