import Image from "next/image";

import Profile from "@/assets/profile.svg";
import Button from "@/components/@common/button";
import { UserInformations } from "@/types/tab-side-menu";

import CustomButton from "./custom-button";

const logoutButtonStyle =
  "min-h-0 w-fit min-w-0 justify-normal bg-opacity-0 p-0 text-xs font-normal text-slate-400 hover:bg-opacity-0";

const profileInfoStyle =
  "flex w-full items-end justify-between text-sm md:flex-col md:items-baseline lg:flex-col lg:items-baseline";

export default function UserProfile({
  isTabOpen,
  profile,
}: {
  isTabOpen: boolean;
  profile: UserInformations | undefined;
}) {
  if (isTabOpen) return null;

  return (
    <>
      <div className="flex w-full gap-12">
        <div className="min-w-40 md:min-w-64 lg:min-w-64">
          {profile ? (
            <Image
              className="h-full w-full"
              src={profile.profileImage}
              alt={`${profile.name}의 프로필 이미지`}
              width={64}
              height={64}
              layout="responsive"
            />
          ) : (
            <Profile />
          )}
        </div>
        <div className={profileInfoStyle}>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {profile ? profile.name : "체다치즈"}
            </p>
            <p className="text-sm font-medium text-slate-600">
              {profile ? profile.email : "chedacheese@slid.kr"}
            </p>
          </div>
          <Button className={logoutButtonStyle}>로그아웃</Button>
        </div>
      </div>
      <CustomButton isMobile={false} color="white">
        새 할 일
      </CustomButton>
    </>
  );
}
