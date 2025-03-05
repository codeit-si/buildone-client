import { useEffect, useRef } from "react";

import Link from "next/link";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { GoalsListProps } from "@/types/tab-side-menu";

const goalsListStyle =
  "max-h-[calc(100vh-450px)] list-disc list-inside space-y-10 overflow-y-auto text-slate-700";

export default function GoalsList({
  goals,
  hasNextPage,
  setIsAdding,
  fetchNextPage,
}: GoalsListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>
      listRef.current &&
      !listRef.current.contains(event.target as Node) &&
      setIsAdding(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsAdding]);

  useEffect(() => {
    goals.length > 0 && setIsAdding(false);
  }, [goals.length, setIsAdding]);

  const reSortedGoalsList = goals.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA.getTime() - dateB.getTime();
  });

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  return (
    <ul ref={listRef} className={goalsListStyle}>
      {reSortedGoalsList.map((goal) => (
        <li key={goal.id} className="hover:text-dark-blue-700 hover:underline">
          <Link href={`goals/${goal.id}`}>{goal.title}</Link>
        </li>
      ))}
      {hasNextPage && <div ref={ref} className="h-1" />}
    </ul>
  );
}
