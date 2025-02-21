"use client";

import { useEffect, useState } from "react";

import { cva } from "class-variance-authority";

import { TabItem } from "@/components/tab-input";
import { UserInformations } from "@/types/tab-sidemenu";

import AddGoalSection from "./add-goal-section";
import GoalsList from "./goals-list";
import GoalsMenu from "./goals-menu";
import LogoComponent from "./logo-component";
import TabToggleComponent from "./tab-toggle-component";
import TodosMenu from "./todos-menu";
import UserProfileComponent from "./user-profile-component";

const containerStyle = cva("fixed z-30 bg-white transition-all", {
  variants: {
    open: {
      true: "w-full h-48 max-h-screen overflow-y-auto md:w-60 md:h-full",
      false: "h-full w-full md:w-280 lg:w-280",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const topSectionStyle = cva(
  "flex flex-col gap-20 md:items-center p-0 md:p-20",
  {
    variants: {
      open: {
        true: "h-full p-0",
        false: "p-20",
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
      true: "h-full flex-row gap-16 md:h-fit md:min-h-full md:w-fit md:flex-col md:items-center md:justify-normal md:border-b lg:h-fit lg:min-h-full lg:w-fit lg:flex-col lg:items-center lg:justify-normal lg:border-b",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export default function TabSidemenu() {
  const [isTabMinimized, setIsTabMinimized] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [goals, setGoals] = useState<TabItem[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [profile, setProfile] = useState<UserInformations | undefined>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() === "") return;
    const newTab: TabItem = {
      id: Date.now(),
      text: newGoal,
    };
    setGoals([...goals, newTab]);
    setNewGoal("");
  };

  // 목표 텍스트 변경 함수
  const handleInputChange = (id: number, newValue: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, text: newValue } : goal,
      ),
    );
  };

  useEffect(() => {
    setProfile((prev) => prev); // ESLint 규정 때문에 넣음
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsTabMinimized(false);
      } else {
        setIsTabMinimized(true);
      }
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
    <div className={containerStyle({ open: isTabMinimized })}>
      <div className={topSectionStyle({ open: isTabMinimized })}>
        <div className={topHeaderStyle({ open: isTabMinimized })}>
          <LogoComponent
            isTabOpen={isTabMinimized}
            setIsTabOpen={setIsTabMinimized}
          />
          <TabToggleComponent
            isTabOpen={isTabMinimized}
            setIsTabOpen={setIsTabMinimized}
          />
        </div>
        <UserProfileComponent isTabOpen={isTabMinimized} profile={profile} />
      </div>
      {/* 탭 열였을때 나타나는 bottom menus */}
      {!isTabMinimized && (
        <>
          <TodosMenu />
          <GoalsMenu isAdding={isAdding} setIsAdding={setIsAdding} />
          <div className="px-20">
            <GoalsList
              goals={goals}
              handleInputChange={handleInputChange}
              setIsAdding={setIsAdding}
            />
            <AddGoalSection
              goals={goals}
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
