import { useEffect, useRef } from "react";

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
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node))
        setIsAdding(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAdding]);
  return (
    <ul ref={listRef} className={goalsListStyle()}>
      {goals.map((goal) => (
        <li key={goal.id}>
          <Link href={`/${goal.id}`}>
            <TabInput
              tab={goal}
              onInputChange={handleInputChange}
              onInputBlur={() => setIsAdding(false)}
              className="cursor-pointer hover:text-purple-700 hover:underline"
              readOnly
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default GoalsList;
