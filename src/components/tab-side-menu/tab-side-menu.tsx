"use client";

import { useEffect, useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { cva } from "class-variance-authority";

import GoalsMenu from "@/components/tab-side-menu/goals-menu";
import { useCreateGoal } from "@/hooks/query/use-goal";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import AddGoalSection from "./add-goal-section";
import GoalsList from "./goals-list";
import LogoComponent from "./logo";
import TabToggle from "./tab-toggle";
import TodosMenu from "./todos-menu";
import UserProfile from "./user-profile";

const containerStyle = cva(
  "fixed z-10 bg-white transition-all border-b border-slate-100 md:border-r md:border-slate-200",
  {
    variants: {
      open: {
        true: "h-full w-full md:w-280 lg:w-280",
        false: "w-full h-48 max-h-screen overflow-y-auto md:w-60 md:h-full",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

const topSectionStyle = cva(
  "flex flex-col gap-14 md:gap-16 md:items-center p-0 md:p-24 md:pt-18",
  {
    variants: {
      open: {
        true: "p-24 pt-0 md:p-20",
        false: "h-full p-0",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

const topHeaderStyle = cva("flex w-full items-center justify-between", {
  variants: {
    open: {
      true: "mt-20 md:m-0",
      false:
        "h-full flex-row px-20 gap-16 md:h-fit md:min-h-full md:w-fit md:flex-col md:items-center md:justify-normal md:border-b lg:h-fit lg:min-h-full lg:w-fit lg:flex-col lg:items-center lg:justify-normal lg:border-b",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export default function TabSideMenu() {
  const [isTabMinimized, setIsTabMinimized] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const { mutate } = useCreateGoal();
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({ size: 20 }),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() === "") return;
    mutate({ title: newGoal }, { onSuccess: () => setNewGoal("") });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setIsTabMinimized(false);
      else setIsTabMinimized(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsAdding(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={containerStyle({ open: !isTabMinimized })}>
      <div className={topSectionStyle({ open: !isTabMinimized })}>
        <div className={topHeaderStyle({ open: !isTabMinimized })}>
          <LogoComponent
            isTabMinimized={isTabMinimized}
            setIsTabMinimized={setIsTabMinimized}
          />
          <TabToggle
            isTabMinimized={isTabMinimized}
            setIsTabMinimized={setIsTabMinimized}
          />
        </div>
        <UserProfile isTabOpen={isTabMinimized} />
      </div>
      {/* 탭 열였을때 나타나는 bottom menus */}
      {!isTabMinimized && (
        <>
          <TodosMenu />
          <GoalsMenu isAdding={isAdding} setIsAdding={setIsAdding} />
          <div className="px-32 md:px-24">
            <GoalsList
              goals={data?.pages}
              hasNextPage={hasNextPage}
              setIsAdding={setIsAdding}
              fetchNextPage={fetchNextPage}
            />
            <AddGoalSection
              goals={data?.pages}
              handleSubmit={handleSubmit}
              isAdding={isAdding}
              newGoal={newGoal}
              setIsAdding={setIsAdding}
              setNewGoal={setNewGoal}
            />
          </div>
        </>
      )}
    </div>
  );
}
