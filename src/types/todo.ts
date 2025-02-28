import { GoalSimpleResponse } from "./goal";

import { CommonPaginationInformationResponse } from ".";

export interface TodosByGoalParams {
  goalId: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}

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

export interface TodoListResponse {
  paginationInformation: CommonPaginationInformationResponse;
  todos: TodoResponse[];
}

export interface ListTodoProps {
  fetchTodos?: (pageParam?: number) => Promise<TodoListResponse>;
}

export interface BaseTodoProps {
  index: number;
  todo: TodoResponse;
}

export interface TodoEditAndDeleteAndIconsProps extends BaseTodoProps {
  activeKebab: number | null;
  handleKebabClick: (index: number) => void;
}

export interface NoteProps {
  todo: TodoResponse;
}

export interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
}
