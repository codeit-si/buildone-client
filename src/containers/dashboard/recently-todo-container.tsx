import { Suspense } from "react";

import RightArrow from "@/assets/arrow_right.svg";
import RecentlyTodoIcon from "@/assets/recently_todo.svg";

import RecentlyTodoList from "./recently-todo-list";

export default function RecentlyTodoContainer() {
  return (
    <section className="flex min-h-258 w-full min-w-343 flex-col gap-16 rounded-2xl bg-white p-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 text-base font-semibold">
          <RecentlyTodoIcon />
          <h2>최근 등록한 할 일</h2>
        </div>
        <div className="flex items-center justify-center gap-8 text-sm font-medium text-slate-600">
          모두 보기 <RightArrow />
        </div>
      </div>
      <Suspense fallback={<div>RecentlyTodoList 로딩중</div>}>
        <RecentlyTodoList />
      </Suspense>
    </section>
  );
}
