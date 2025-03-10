"use client";

import { useEffect, useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";

import GoalsMenu from "@/components/tab-side-menu/goals-menu";
import { useCreateGoal } from "@/hooks/query/use-goal";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";

import AddGoalSection from "./add-goal-section";
import GoalsList from "./goals-list";
import Logo from "./logo";
import TabToggle from "./tab-toggle";
import TodosMenu from "./todos-menu";
import UserProfile from "./user-profile";

const containerStyle = cva(
  "overflow-y-hidden fixed z-30 transition-all duration-100 bg-white border-b border-slate-100 md:border-r md:border-slate-200",
  {
    variants: {
      open: {
        true: "h-full w-full md:w-280 lg:w-280 overflow-hidden",
        false:
          "w-full h-48 max-h-screen overflow-y-auto md:w-60 md:h-full overflow-hidden",
      },
    },
    defaultVariants: {
      open: true,
    },
  },
);

const topSectionStyle = cva(
  "flex flex-col md:gap-16 md:items-center md:pt-18",
  {
    variants: {
      open: {
        true: "px-24 pt-0 md:p-20",
        false: "h-full p-0",
      },
    },
    defaultVariants: {
      open: true,
    },
  },
);

const topHeaderStyle = cva(
  "flex w-full relative items-center md:justify-normal",
  {
    variants: {
      open: {
        true: "mt-16 md:m-0",
        false:
          "h-full md:border-none flex-row px-16 md:gap-16 md:h-fit md:min-h-full md:w-fit md:flex-col md:items-center md:justify-normal md:border-b lg:h-fit lg:min-h-full lg:w-fit lg:flex-col lg:items-center lg:justify-normal lg:border-b",
      },
    },
    defaultVariants: {
      open: true,
    },
  },
);

export default function TabSideMenu() {
  const [isTabMinimized, setIsTabMinimized] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const { mutate } = useCreateGoal();
  const pathname = usePathname();
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

  useEffect(() => {
    if (!isTabMinimized && window.innerWidth <= 744)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isTabMinimized]);

  useEffect(() => {
    setIsTabMinimized(true);
  }, [pathname]);

  return (
    <>
      <div className={containerStyle({ open: !isTabMinimized })}>
        <div className={topSectionStyle({ open: !isTabMinimized })}>
          <div className={topHeaderStyle({ open: !isTabMinimized })}>
            <Logo
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
        <div
          className={`transition-all duration-100 ${
            isTabMinimized
              ? "-translate-y-1000 opacity-0 md:-translate-x-full"
              : "translate-y-0 opacity-100 md:translate-x-0"
          }`}
        >
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
        </div>
      </div>
      {!isTabMinimized && (
        <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-black bg-opacity-50 lg:hidden" />
      )}
    </>
  );
}
