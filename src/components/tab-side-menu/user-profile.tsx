import { useState } from "react";

import { cva } from "class-variance-authority";

import Profile from "@/assets/icons-big/profile.svg";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/store/auth-store";
import { useUserStore } from "@/store/user-store";

import Skeleton from "../@common/skeleton";
import TodoModal from "../@common/todo-modal/todo-modal";

import CustomButton from "./custom-button";

const containerStyle = cva(
  "w-full md:block overflow-hidden transition-all duration-300",
  {
    variants: {
      open: {
        true: "-translate-x-full opacity-0 h-0",
        false: "translate-x-0 opacity-100 mt-16 md:m-0",
      },
    },
    defaultVariants: {
      open: true,
    },
  },
);

const logoutButtonStyle =
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0";

const profileInfoStyle =
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline";

export default function UserProfile({ isTabOpen }: { isTabOpen: boolean }) {
  const { userInformation } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { removeAccessToken } = useAuthStore();

  const logoutHandler = async () => {
    logout();
    removeAccessToken();
    window.location.href = "/login";
  };

  return (
    <div className={containerStyle({ open: isTabOpen })}>
      <div className="mb-24 flex w-full gap-12">
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
    </div>
  );
}
