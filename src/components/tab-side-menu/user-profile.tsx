import { useState } from "react";

import Profile from "@/assets/icons-big/profile.svg";
import { useUserStore } from "@/store/user-store";

import Skeleton from "../@common/skeleton";
import TodoModal from "../@common/todo-modal/todo-modal";

import CustomButton from "./custom-button";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/store/auth-store";

const logoutButtonStyle =
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0";

const profileInfoStyle =
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline";

export default function UserProfile({ isTabOpen }: { isTabOpen: boolean }) {
  const { userInformation } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isTabOpen) return null;

  const logoutHandler = async () => {
    try {
      logout()
      useAuthStore.getState().setAccessToken("");
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <>
      <div className="flex w-full gap-12">
        <div className="min-w-40 md:min-w-64 lg:min-w-64">
          <Profile />
        </div>
        <div className={profileInfoStyle}>
          <div>
            {userInformation ? (
              <>
                <p className="text-sm font-semibold text-slate-800">
                  {userInformation.name || ""}
                </p>
                <p className="text-sm font-medium text-slate-600">
                  {userInformation.email || ""}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-y-10 pt-4">
                <Skeleton className="h-11 w-50" />
                <Skeleton className="h-11 w-132" />
              </div>
            )}
          </div>
          <button onClick={logoutHandler} className={logoutButtonStyle}>
            로그아웃
          </button>
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
