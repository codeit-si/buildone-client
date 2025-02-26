import { Suspense } from "react";

import Link from "next/link";

import RightArrow from "@/assets/arrow_right.svg";
import RecentlyTodoIcon from "@/assets/recently_todo.svg";

import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

import RecentlyTodoList from "./recently-todo-list";

export default function RecentlyTodoContainer() {
  return (
    <SectionContainer className="relative">
      <div className="flex items-center justify-between pr-4">
        <SectionTitle>
          <RecentlyTodoIcon />
          <h2>최근 등록한 할 일</h2>
        </SectionTitle>
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
    </SectionContainer>
  );
}
