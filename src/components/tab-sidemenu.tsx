"use client";

import { useState } from "react";

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

interface LinkProps {
  href: string;
  icon: JSX.Element;
  title: string;
  cursur: "cursor-pointer" | "cursor-default";
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
export default function TabSidemenu() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [goals, setGoals] = useState<TabItem[]>([]); // 목표 목록
  const [newGoal, setNewGoal] = useState(""); // 새로운 목표 텍스트
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
    <div
      className={`${isTabOpen ? "h-48 w-full md:h-full md:w-60 lg:h-full lg:w-60" : "h-full w-full md:w-280 lg:w-280"} fixed z-30 bg-white`}
    >
      <div
        className={`space-y-20 p-0 md:p-20 lg:p-20 ${isTabOpen ? "h-full p-0" : "p-20"}`}
      >
        <div
          className={`${isTabOpen && "h-full flex-row gap-16 md:h-fit md:min-h-full md:w-fit md:flex-col md:items-center md:justify-normal md:border-b lg:h-fit lg:min-h-full lg:w-fit lg:flex-col lg:items-center lg:justify-normal lg:border-b"} flex items-center justify-between`}
        >
          <div className={`${isTabOpen && "hidden md:block lg:block"}`}>
            <Link className="hidden md:block" href="/home">
              {!isTabOpen ? <Logo1 /> : <Logo2 />}
            </Link>
            <Button
              onClick={() => setIsTabOpen(!isTabOpen)}
              className="min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0 md:hidden"
            >
              <Logo1 />
            </Button>
          </div>
          <div className={`item-center flex ${!isTabOpen && "hidden md:flex"}`}>
            <Button
              onClick={() => setIsTabOpen(!isTabOpen)}
              className="ml-20 min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0"
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
            <h2 className="ml-5 text-14 font-bold leading-6 text-slate-800 md:hidden">
              대시보드
            </h2>
          </div>
        </div>
        {!isTabOpen && (
          <>
            <div className="flex gap-12">
              <div className="min-w-40 md:min-w-64 lg:min-w-64">
                {profile ? (
                  <Image className="h-full w-full" src="" alt="" />
                ) : (
                  <Profile />
                )}
              </div>
              <div className="flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline">
                <div>
                  <p className="font-bold text-slate-800">체다치즈</p>
                  <p className="text-slate-600">chedacheese@slid.kr</p>
                </div>
                <Button className="min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0">
                  로그아웃
                </Button>
              </div>
            </div>
            <Button className="hidden w-full font-normal md:flex lg:flex">
              <>
                <div className="hidden md:block">
                  <PlusWhite />
                </div>
                <div className="block md:hidden">
                  <PlusWhiteSmall />
                </div>
                <p className="ml-5">새 할 일</p>
              </>
            </Button>
          </>
        )}
      </div>
      {!isTabOpen && (
        <>
          <div className="flex items-center justify-between border-t">
            <Menus
              href="/home"
              title="대시보드"
              icon={<DashBoard />}
              cursur="cursor-pointer"
            />
            <Button className="mr-20 flex max-h-36 min-h-36 min-w-84 max-w-84 p-0 font-normal md:hidden lg:hidden">
              <>
                <div className="hidden md:block">
                  <PlusWhite />
                </div>
                <div className="block md:hidden">
                  <PlusWhiteSmall />
                </div>
                <p className="ml-5 text-13">새 할 일</p>
              </>
            </Button>
          </div>
          <div className="flex items-center border-t">
            <Menus
              href="/#"
              title="목표"
              icon={<Goals />}
              cursur="cursor-default"
            />
            {!isAdding && (
              <Button
                onClick={() => setAdding(!isAdding)}
                variant="outlined"
                className="mr-20 flex max-h-36 min-h-36 min-w-84 max-w-84 p-0 md:hidden lg:hidden"
              >
                <>
                  <div className="hidden md:block">
                    <PlusBlue />
                  </div>
                  <div className="block md:hidden">
                    <PlusBlueSmall />
                  </div>
                  <p className="ml-5 text-13">새 목 표</p>
                </>
              </Button>
            )}
          </div>
          <div className="px-20">
            <ul className="max-h-200 list-disc space-y-10 overflow-y-auto">
              {goals.map((goal) => (
                <TabInput
                  key={goal.id}
                  tab={goal}
                  onInputChange={handleInputChange}
                  onInputBlur={() => setAdding(false)}
                />
              ))}
            </ul>
            <div className={`${goals.length === 0 ? "" : "mt-10"}`}>
              {!isAdding ? (
                <Button
                  onClick={() => setAdding(!isAdding)}
                  className="hidden w-full md:flex lg:flex"
                  variant="outlined"
                >
                  <>
                    <div className="hidden md:block">
                      <PlusBlue />
                    </div>
                    <div className="block md:hidden">
                      <PlusBlueSmall />
                    </div>
                    <p className="ml-5">새 목 표</p>
                  </>
                </Button>
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
          </div>
        </>
      )}
    </div>
  );
}
