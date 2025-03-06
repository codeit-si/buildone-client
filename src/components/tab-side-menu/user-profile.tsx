// import Image from "next/image";

import { useState } from "react";

import Profile from "@/assets/icons-big/profile.svg";
import Button from "@/components/@common/button";
import { useUserStore } from "@/store/user-store";

import TodoModal from "../@common/todo-modal/todo-modal";

import CustomButton from "./custom-button";

const logoutButtonStyle =
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0";

const profileInfoStyle =
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline";

export default function UserProfile({ isTabOpen }: { isTabOpen: boolean }) {
  const { userInformation } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isTabOpen) return null;
  return (
    <>
      <div className="flex w-full gap-12">
        <div className="min-w-40 md:min-w-64 lg:min-w-64">
          <Profile />
        </div>
        <div className={profileInfoStyle}>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {userInformation?.name || "체다치즈"}
            </p>
            <p className="text-sm font-medium text-slate-600">
              {userInformation?.email || "chedacheese@slid.kr"}
            </p>
          </div>
          <Button className={logoutButtonStyle}>로그아웃</Button>
        </div>
      </div>
      <CustomButton
        isMobile={false}
        color="white"
        onClick={() => setIsModalOpen(true)}
      >
        새 할 일
      </CustomButton>
      {isModalOpen && (
        <TodoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
}
