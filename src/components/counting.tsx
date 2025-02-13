"use client";

import { cn } from "@/lib/cn";

interface CountingProps {
  type: "title" | "text";
  count: number;
  total: number;
}

const BASE_CLASS =
  "absolute flex items-center justify-center rounded-lg text-xs font-medium";
const TITLE_CLASS = "bg-white/50 px-1 text-slate-800";
const TEXT_CLASS = "text-slate-800";

const Counting = ({ type, count, total }: CountingProps) => {
  if (type === "title") {
    return (
      <div className={cn(BASE_CLASS, TITLE_CLASS)}>
        {count}/<span className="text-blue-500">{total}</span>
      </div>
    );
  }

  return (
    <div className={cn(BASE_CLASS, TEXT_CLASS)}>
      공백포함 : 총 {total}자 | 공백제외 : 총 {count}자
    </div>
  );
};

export default Counting;
