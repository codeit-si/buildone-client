import Goal from "@/components/@common/goal";
import TodoTitleAndCheckBox from "@/components/todo/todo-title-checkbox";
import { TodoResponse } from "@/types/todo";

interface GoalsListComponentProps {
  recentTodos: TodoResponse[];
}
export default function GoalsListComponent({
  recentTodos,
}: GoalsListComponentProps) {
  return (
    <ul className="space-y-15 pb-20">
      {recentTodos.map((todo, index) => (
        <li key={todo.id} className="flex flex-col">
          <TodoTitleAndCheckBox index={index} todo={todo} />
          <Goal todo={todo} />
        </li>
      ))}
    </ul>
  );
}
