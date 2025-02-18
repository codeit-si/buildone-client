import { cva } from "class-variance-authority";
import Link from "next/link";

import { TabInput } from "@/components/tab-input";
import { GoalsListProps } from "@/types/tab-sidemenu";

const goalsListStyle = cva(
  "max-h-400 list-disc list-inside space-y-10 overflow-y-auto text-slate-700",
);
const GoalsList = ({
  goals,
  handleInputChange,
  setIsAdding,
}: GoalsListProps) => {
  return (
    <ul className={goalsListStyle()}>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Link href={`/${goal.id}`}>
            <TabInput
              key={goal.id}
              tab={goal}
              onInputChange={handleInputChange}
              onInputBlur={() => setIsAdding(false)}
              className="cursor-pointer hover:underline"
              readOnly
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default GoalsList;
