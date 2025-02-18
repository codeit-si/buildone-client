"use client";

import { useEffect, useState } from "react";

import { cva } from "class-variance-authority";

import AddGoalSection from "@/containers/tab-sidemenu/AddGoalSection";
import GoalsList from "@/containers/tab-sidemenu/GoalsList";
import GoalsMenu from "@/containers/tab-sidemenu/GoalsMenu";
import LogoComponent from "@/containers/tab-sidemenu/LogoComponent";
import TabToggleComponent from "@/containers/tab-sidemenu/TabToggleComponent";
import TodosMenu from "@/containers/tab-sidemenu/TodosMenu";
import UserProfileComponent from "@/containers/tab-sidemenu/UserProfileComponent";
import { UserInformations } from "@/types/tab-sidemenu";

import { TabItem } from "./tab-input";

const containerStyle = cva("fixed z-30 bg-white", {
  variants: {
    open: {
      true: "h-48 w-full md:h-full md:w-60 lg:h-full lg:w-60",
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
  const [isTabOpen, setIsTabOpen] = useState(false);
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
        setIsTabOpen(false);
      } else {
        setIsTabOpen(true);
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
    <div className={containerStyle({ open: isTabOpen })}>
      <div className={topSectionStyle({ open: isTabOpen })}>
        <div className={topHeaderStyle({ open: isTabOpen })}>
          <LogoComponent isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
          <TabToggleComponent
            isTabOpen={isTabOpen}
            setIsTabOpen={setIsTabOpen}
          />
        </div>
        <UserProfileComponent isTabOpen={isTabOpen} profile={profile} />
      </div>
      {/* 탭 열였을때 나타나는 bottom menus */}
      {!isTabOpen && (
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
