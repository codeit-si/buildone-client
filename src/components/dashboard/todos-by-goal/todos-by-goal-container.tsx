"use client";

import { Suspense } from "react";

import FlagIcon from "@/assets/flag.svg";

import DashboardLoading from "../dashboard-loading";
import SectionContainer from "../section-container";
import SectionTitle from "../section-title";

import GoalList from "./goal-list";

export default function TodosByGoalContainer() {
  return (
    <SectionContainer className="mt-12 md:mt-16 min-h-200 md:col-span-2 md:min-h-511">
      <SectionTitle>
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-blue-500">
          <FlagIcon />
        </div>
        <h2 className="line-clamp-1">목표 별 할일</h2>
      </SectionTitle>
      <Suspense
        fallback={
          <DashboardLoading>목표를 불러오는 중입니다...</DashboardLoading>
        }
      >
        <GoalList />
      </Suspense>
    </SectionContainer>
  );
}
