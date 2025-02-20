export interface Todo {
  id: string;
  title: string;
  status: "todo" | "done";
  hasGoal: string | null;
  hasLink: boolean;
  hasFile: boolean;
  hasNote: boolean;
  createdAt: number;
}
export interface TodosResponse {
  todos: Todo[];
  nextCursor?: string;
}
export interface ListTodoProps {
  fetchTodos?: (
    pageParam?: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
}
export interface BaseTodoProps {
  index: number;
  todo: Todo;
}
export interface TodoTitleAndCheckBoxProps extends BaseTodoProps {
  toggleStatus: (id: string) => void;
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
