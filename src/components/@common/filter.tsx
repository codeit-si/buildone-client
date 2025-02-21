"use client";

interface FilterProps {
  filter: "all" | "todo" | "done";
  setFilter: (value: "all" | "todo" | "done") => void;
}

const filters: Record<FilterProps["filter"], string> = {
  all: "All",
  todo: "To do",
  done: "Done",
};

const BASE_CLASS = "rounded-3xl border px-12 py-4 text-base transition-colors";
const ACTIVE_CLASS =
  "text-white border-dark-blue-500 bg-dark-blue-500 text-slate-50";
const INACTIVE_CLASS = "bg-white border-slate-300 text-slate-800";

export default function Filter({
  filter,
  setFilter,
}: FilterProps): JSX.Element {
  return (
    <div className="flex gap-2" role="group" aria-label="작업 상태 필터">
      {Object.entries(filters).map(([value, label]) => (
        <button
          key={value}
          onClick={() => setFilter(value as FilterProps["filter"])}
          className={`${BASE_CLASS} ${filter === value ? ACTIVE_CLASS : INACTIVE_CLASS}`}
          role="tab"
          aria-selected={filter === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
