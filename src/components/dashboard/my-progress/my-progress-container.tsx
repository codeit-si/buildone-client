"use client";

import { Suspense, useState } from "react";

import EllipseIcon from "@/assets/icons-big/ellipse.svg";
import LoadingSpinner from "@/components/@common/loading-spinner";
import StreakBoard from "@/components/dashboard/streak-board/streak-board";
import { cn } from "@/lib/cn";

import SectionContainer from "../section-container";

import MyProgress from "./my-progress";
import MyProgressToggle from "./my-progress-toggle";

export default function MyProgressContainer() {
  const [toggleStreak, setToggleStreak] = useState(false);

  return (
    <SectionContainer
      className={cn(
        "relative bg-dark-blue-500 lg:px-24",
        toggleStreak && "bg-white",
      )}
    >
      {!toggleStreak && (
        <div className="relative h-full w-full">
          <MyProgress />
          <div className="absolute -bottom-16 -right-16 lg:-right-24">
            <EllipseIcon />
          </div>
        </div>
      )}
      {toggleStreak && (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          }
        >
          <StreakBoard />{" "}
        </Suspense>
      )}
      <MyProgressToggle
        toggle={toggleStreak}
        setToggle={() => setToggleStreak((prev) => !prev)}
      />
    </SectionContainer>
  );
}
