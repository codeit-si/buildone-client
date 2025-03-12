"use client";

import { useState } from "react";

import EllipseIcon from "@/assets/icons-big/ellipse.svg";
import StreakBoard from "@/components/dashboard/streak-board/streak-board";
import { cn } from "@/lib/cn";

import SectionContainer from "../section-container";

import MyProgress from "./my-progress";

export default function MyProgressContainer() {
  const [toggleStreak, setToggleStreak] = useState(false);

  return (
    <SectionContainer
      className={cn(
        "relative bg-dark-blue-500 lg:px-24",
        toggleStreak && "bg-white",
      )}
    >
      {toggleStreak && <StreakBoard />}
      {!toggleStreak && (
        <div className="relative h-full w-full">
          <MyProgress />
          <div className="absolute -bottom-16 -right-16 lg:-right-24">
            <EllipseIcon />
          </div>
        </div>
      )}
      <button
        className={cn(
          "absolute right-15 top-15 text-sm text-white",
          toggleStreak && "text-dark-blue-400",
        )}
        onClick={() => setToggleStreak(!toggleStreak)}
        type="button"
      >
        {toggleStreak ? "통계 보기" : "스트릭 보기"} {">"}
      </button>
    </SectionContainer>
  );
}
