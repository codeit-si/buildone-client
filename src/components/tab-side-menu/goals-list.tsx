import { useEffect, useRef } from "react";

import Link from "next/link";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { GoalsListProps } from "@/types/tab-side-menu";

const goalsListStyle =
  "scrollbar max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-600px)] list-disc list-inside space-y-10 overflow-y-auto text-slate-700";

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
    if (goals.length > 0) {
      setIsAdding(false);
    }

    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [goals.length, setIsAdding]);

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage });

  return (
    <ul ref={listRef} className={goalsListStyle}>
      {goals
        .slice()
        .reverse()
        .map((goal) => (
          <li key={goal.id}>
            <Link
              className="hover:text-dark-blue-700 hover:underline"
              href={`/goals/${goal.id}`}
            >
              {goal.title}
            </Link>
          </li>
        ))}
      {hasNextPage && <div ref={ref} className="h-1" />}
    </ul>
  );
}
