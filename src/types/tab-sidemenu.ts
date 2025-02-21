import { SetStateAction } from "react";

import { TabItem } from "@/components/tab-input";

export interface LinkProps {
  href: string;
  icon: JSX.Element;
  title: string;
  cursor: "cursor-pointer" | "cursor-default";
}
export interface ButtonProps {
  isMobile: boolean;
  children: string;
  color: "white" | "blue";
  onClick?: () => void;
  variant?: "outlined";
}
export interface IsTabOpenProps {
  setIsTabOpen: (value: SetStateAction<boolean>) => void;
  isTabOpen: boolean;
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
