import { Suspense } from "react";

import Link from "next/link";

import RecentlyTodoIcon from "@/assets/icons-big/recently_todo.svg";
import RightArrow from "@/assets/icons-small/arrow/arrow_right.svg";

import DashboardLoading from "../dashboard-loading";
import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

import RecentlyTodoList from "./recently-todo-list";

export default function RecentlyTodoContainer() {
  return (
    <SectionContainer className="">
      <div className="flex items-center justify-between pr-4">
        <SectionTitle>
          <RecentlyTodoIcon />
          <h2 className="line-clamp-1">최근 등록한 할 일</h2>
        </SectionTitle>
        <Link
          href="/todos"
          className="flex items-center justify-center gap-8 text-sm font-medium text-slate-600"
        >
          모두 보기 <RightArrow />
        </Link>
      </div>
      <Suspense
        fallback={
          <DashboardLoading>
            최근 등록한 할 일을 불러오는 중입니다...
          </DashboardLoading>
        }
      >
        <RecentlyTodoList />
      </Suspense>
    </SectionContainer>
  );
}
