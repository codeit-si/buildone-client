import { Todo } from "@/types/container-recently-todo";

import Goal from "./Goal";
import TodoTitleAndCheckBox from "./todo-title-checkbox";

interface GoalsListComponentProps {
  recentTodos: Todo[];
  toggleStatus: (id: string) => void;
}
const GoalsListComponent = ({
  recentTodos,
  toggleStatus,
}: GoalsListComponentProps) => {
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
};
export default GoalsListComponent;
