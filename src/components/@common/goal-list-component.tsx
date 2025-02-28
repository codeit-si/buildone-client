import { Todo } from "@/types/todo";

import TodoTitleAndCheckBox from "../todo/todo-title-checkbox";

import Goal from "./goal";

interface GoalsListComponentProps {
  recentTodos: Todo[];
  toggleStatus: (id: number) => void;
}
export default function GoalsListComponent({
  recentTodos,
  toggleStatus,
}: GoalsListComponentProps) {
  return (
    <ul className="space-y-15 pb-20">
      {recentTodos.map((todo, index) => (
        <li key={todo.id} className="flex flex-col">
          <TodoTitleAndCheckBox
            index={index}
            todo={todo}
            toggleStatus={toggleStatus}
          />
          <Goal todo={todo} />
        </li>
      ))}
    </ul>
  );
}
