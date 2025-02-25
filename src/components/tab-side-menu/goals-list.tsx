import { useEffect, useRef } from "react";

import Link from "next/link";

import { GoalsListProps } from "@/types/tab-side-menu";

const goalsListStyle =
  "max-h-[calc(100vh-450px)] list-disc list-inside space-y-10 overflow-y-auto text-slate-700";

export default function GoalsList({ goals, setIsAdding }: GoalsListProps) {
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

  useEffect(() => {
    if (goals.length > 0) setIsAdding(false);
  }, [goals, setIsAdding]);

  return (
    <ul ref={listRef} className={goalsListStyle}>
      {goals.map((goal) => (
        <li key={goal.id} className="hover:text-dark-blue-700 hover:underline">
          <Link href={`goals/${goal.id}`}>{goal.text}</Link>
        </li>
      ))}
    </ul>
  );
}
