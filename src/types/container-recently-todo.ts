export interface Todo {
  id: string;
  title: string;
  status: "todo" | "done";
  hasGoal: string | null;
  hasLink: boolean;
  hasFile: boolean;
  createdAt: number;
}
