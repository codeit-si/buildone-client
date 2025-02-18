import { cva } from "class-variance-authority";
import Image from "next/image";

import Profile from "@/assets/profile.svg";
import Button from "@/components/button";
import { desktopButtonStyle } from "@/styles/tab-sidemenu";

import CustomButton from "./CustomButton";

const logoutButtonStyle = cva(
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0",
);
const profileInfoStyle = cva(
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline",
);
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
        새할일
      </CustomButton>
    </>
  );
};
export default UserProfileComponent;
