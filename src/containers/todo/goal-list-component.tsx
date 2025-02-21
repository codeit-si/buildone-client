import { Todo } from "@/types/todo";

import Goal from "./Goal";
import TodoTitleAndCheckBox from "./todo-title-checkbox";

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
