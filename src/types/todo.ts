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

export interface ListTodoProps {
  fetchTodos?: (pageParam?: number) => Promise<TodoListResponse>;
}

export interface BaseTodoProps {
  index: number;
  todo: Todo;
}

export interface TodoTitleAndCheckBoxProps extends BaseTodoProps {
  toggleStatus: (id: number) => void;
}

export interface TodoEditAndDeleteAndIconsProps extends BaseTodoProps {
  activeKebab: number | null;
  handleKebabClick: (index: number) => void;
}

export interface NoteProps {
  todo: Todo;
}

export interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
}
