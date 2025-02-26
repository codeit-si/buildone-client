import { Suspense } from "react";

import Link from "next/link";

import RecentlyTodoIcon from "@/assets/icons-big/recently_todo.svg";
import RightArrow from "@/assets/icons-small/arrow/arrow_right.svg";

import RecentlyTodoList from "./recently-todo-list";

export default function RecentlyTodoContainer() {
  return (
    <section className="relative flex h-258 w-full flex-col gap-16 rounded-2xl bg-white p-16 md:h-250">
      <div className="flex items-center justify-between pr-4">
        <div className="flex items-center gap-8 text-base font-semibold md:text-lg">
          <RecentlyTodoIcon />
          <h2>최근 등록한 할 일</h2>
        </div>
        <Link
          href="/todos"
          className="flex items-center justify-center gap-8 text-sm font-medium text-slate-600"
        >
          모두 보기 <RightArrow />
        </Link>
      </div>
      <Suspense fallback={<div>RecentlyTodoList 로딩중</div>}>
        <RecentlyTodoList />
      </Suspense>
    </section>
  );
}
