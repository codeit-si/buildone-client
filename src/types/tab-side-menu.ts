import { ReactNode, SetStateAction } from "react";

import { TabItem } from "@/components/tab-side-menu/tab-input";

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
  goals: TabItem[];
  handleInputChange: (id: number, newValue: string) => void;
  setIsAdding: (value: boolean) => void;
}

export interface AddGoalSectionProps {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setNewGoal: (value: string) => void;
  newGoal: string;
  goals: TabItem[];
}

export interface UserInformations {
  name: string;
  email: string;
  profileImage: string;
}
