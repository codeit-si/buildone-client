"use client";

import { SetStateAction, useState } from "react";

import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import DashBoard from "@/assets/dashboard.svg";
import Goals from "@/assets/goals.svg";
import Logo1 from "@/assets/logo_1.svg";
import Logo2 from "@/assets/logo_2.svg";
import PlusBlue from "@/assets/plus/plus_b.svg";
import PlusBlueSmall from "@/assets/plus/plus_b_sm.svg";
import PlusWhite from "@/assets/plus/plus_w.svg";
import PlusWhiteSmall from "@/assets/plus/plus_w_sm.svg";
import Profile from "@/assets/profile.svg";
import Sandwich from "@/assets/sandwich.svg";
import TabOff from "@/assets/tab_off.svg";
import TabOn from "@/assets/tab_on.svg";

import Button from "./button";
import { TabInput, TabItem } from "./tab-input";

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
const topSectionStyle = cva("space-y-20 p-0 md:p-20 lg:p-20", {
  variants: {
    open: {
      true: "h-full p-0",
      false: "p-20",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const topHeaderStyle = cva("flex items-center justify-between", {
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
const tabToggleWrapStyle = cva("item-center flex", {
  variants: {
    open: {
      true: "hidden md:flex",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const tabToggleButtonStyle = cva(
  "ml-20 min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0",
);
const mobileStatusTitleStyle = cva(
  "ml-5 text-14 font-bold leading-6 text-slate-800 md:hidden",
);
const profileInfoStyle = cva(
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline",
);
const logoutButtonStyle = cva(
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0",
);
const mobileButtonStyle = cva(
  "mr-20 flex max-h-36 min-h-36 min-w-84 max-w-84 p-0 md:hidden lg:hidden",
);
const desktopButtonStyle = cva("hidden w-full font-normal md:flex lg:flex");
const goalsListStyle = cva("max-h-200 list-disc space-y-10 overflow-y-auto");
const logoWrapStyle = cva("", {
  variants: {
    open: {
      true: "hidden md:block lg:block",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const logoStyle = cva(
  "min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0 md:hidden",
);

interface LinkProps {
  href: string;
  icon: JSX.Element;
  title: string;
  cursur: "cursor-pointer" | "cursor-default";
}
interface ButtonProps {
  isMobile: boolean;
  className: typeof desktopButtonStyle | typeof mobileButtonStyle;
  children: string;
  color: "white" | "blue";
  onClick?: () => void;
  variant?: "outlined";
}
interface IsTabOpenProps {
  setIsTabOpen: (value: SetStateAction<boolean>) => void;
  isTabOpen: boolean;
}
interface IsAddingProps {
  setIsAdding: (value: SetStateAction<boolean>) => void;
  isAdding: boolean;
}
interface GoalsListProps {
  goals: TabItem[];
  handleInputChange: (id: number, newValue: string) => void;
  setIsAdding: (value: boolean) => void;
}
interface AddGoalSectionProps {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setNewGoal: (value: string) => void;
  newGoal: string;
  goals: { id: number; text: string }[];
}

const Menus = ({ href, icon, title, cursur }: LinkProps) => {
  return (
    <Link
      className={`${cursur} flex w-full items-center gap-10 px-20 py-15 font-bold text-slate-800`}
      href={href}
    >
      {icon}
      <h3>{title}</h3>
    </Link>
  );
};
const CustomButton = ({
  isMobile,
  className,
  children,
  onClick,
  variant,
  color,
}: ButtonProps) => {
  const whiteColor = color === "white";
  const Icon = isMobile
    ? whiteColor
      ? PlusWhiteSmall
      : PlusBlueSmall
    : whiteColor
      ? PlusWhite
      : PlusBlue;

  return (
    <Button className={className()} onClick={onClick} variant={variant}>
      <Icon />
      <p className={`ml-5 h-full ${isMobile ? "text-13" : ""}`}>{children}</p>
    </Button>
  );
};
const LogoComponent = ({ isTabOpen, setIsTabOpen }: IsTabOpenProps) => {
  return (
    <div className={logoWrapStyle({ open: isTabOpen })}>
      <Link className="hidden md:block" href="/home">
        {!isTabOpen ? <Logo1 /> : <Logo2 />}
      </Link>
      <Button onClick={() => setIsTabOpen(!isTabOpen)} className={logoStyle()}>
        <Logo1 />
      </Button>
    </div>
  );
};
const TabToggleComponent = ({ isTabOpen, setIsTabOpen }: IsTabOpenProps) => {
  return (
    <div className={tabToggleWrapStyle({ open: !isTabOpen })}>
      <Button
        onClick={() => setIsTabOpen(!isTabOpen)}
        className={tabToggleButtonStyle()}
      >
        {!isTabOpen ? (
          <TabOff />
        ) : (
          <>
            <div className="hidden md:block lg:block">
              <TabOn />
            </div>
            <div className="block md:hidden lg:hidden">
              <Sandwich />
            </div>
          </>
        )}
      </Button>
      <h2 className={mobileStatusTitleStyle()}>대시보드</h2>
    </div>
  );
};
const UserProfileComponent = ({
  isTabOpen,
  profile,
}: {
  isTabOpen: boolean;
  profile: boolean;
}) => {
  if (isTabOpen) return null;
  return (
    <>
      <div className="flex gap-12">
        <div className="min-w-40 md:min-w-64 lg:min-w-64">
          {profile ? (
            <Image className="h-full w-full" src="" alt="" />
          ) : (
            <Profile />
          )}
        </div>
        <div className={profileInfoStyle()}>
          <div>
            <p className="font-bold text-slate-800">체다치즈</p>
            <p className="text-slate-600">chedacheese@slid.kr</p>
          </div>
          <Button className={logoutButtonStyle()}>로그아웃</Button>
        </div>
      </div>
      <CustomButton
        isMobile={false}
        className={desktopButtonStyle}
        color="white"
      >
        새 할 일
      </CustomButton>
    </>
  );
};
const TodosMenu = () => {
  return (
    <div className="flex items-center justify-between border-t">
      <Menus
        href="/home"
        title="대시보드"
        icon={<DashBoard />}
        cursur="cursor-pointer"
      />
      <CustomButton className={mobileButtonStyle} isMobile color="white">
        새할일
      </CustomButton>
    </div>
  );
};
const GoalsMenu = ({ isAdding, setIsAdding }: IsAddingProps) => {
  return (
    <div className="flex items-center border-t">
      <Menus href="/#" title="목표" icon={<Goals />} cursur="cursor-default" />
      {!isAdding && (
        <CustomButton
          className={mobileButtonStyle}
          isMobile
          onClick={() => setIsAdding(!isAdding)}
          variant="outlined"
          color="blue"
        >
          새목표
        </CustomButton>
      )}
    </div>
  );
};
const GoalsList = ({
  goals,
  handleInputChange,
  setIsAdding,
}: GoalsListProps) => {
  return (
    <ul className={goalsListStyle()}>
      {goals.map((goal) => (
        <TabInput
          key={goal.id}
          tab={goal}
          onInputChange={handleInputChange}
          onInputBlur={() => setIsAdding(false)}
        />
      ))}
    </ul>
  );
};
const AddGoalSection = ({
  isAdding,
  setIsAdding,
  handleSubmit,
  setNewGoal,
  newGoal,
  goals,
}: AddGoalSectionProps) => {
  return (
    <div className={`${goals.length === 0 ? "" : "mt-10"}`}>
      {!isAdding ? (
        <CustomButton
          className={desktopButtonStyle}
          isMobile={false}
          onClick={() => setIsAdding(!isAdding)}
          variant="outlined"
          color="blue"
        >
          새목표
        </CustomButton>
      ) : (
        <form onSubmit={handleSubmit}>
          <TabInput
            onInputChange={(id, newValue) => setNewGoal(newValue)}
            onInputBlur={() => {}}
            tab={{ id: 0, text: newGoal }}
          />
        </form>
      )}
    </div>
  );
};

export default function TabSidemenu() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [goals, setGoals] = useState<TabItem[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const profile = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() === "") return;
    const newTab: TabItem = {
      id: goals.length + 1,
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
