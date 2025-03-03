import { ReactNode, SetStateAction } from "react";

import { GoalResponse } from "./goal";

export interface LinkProps {
  href: string;
  icon: JSX.Element;
  title: string;
  cursor: "cursor-pointer" | "cursor-default";
}

export interface ButtonProps {
  isMobile: boolean;
  children: ReactNode;
  color: "white" | "blue";
  onClick?: () => void;
  variant?: "outlined";
  className?: string;
}

export interface IsTabMinimizedProps {
  setIsTabMinimized: (value: SetStateAction<boolean>) => void;
  isTabMinimized: boolean;
}

export interface IsAddingProps {
  setIsAdding: (value: SetStateAction<boolean>) => void;
  isAdding: boolean;
}

export interface GoalsListProps {
  goals: GoalResponse[];
  setIsAdding: (value: boolean) => void;
  isPending: boolean;
}

export interface AddGoalSectionProps {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setNewGoal: (value: string) => void;
  newGoal: string;
  goals: GoalResponse[];
}
