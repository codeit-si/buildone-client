"use client";

import { useState } from "react";

import ExportIcon from "@/assets/export.svg";
import SaveIcon from "@/assets/profile-card/download.svg";
import FlagIcon from "@/assets/profile-card/flag.svg";
import HashIcon from "@/assets/profile-card/hash.svg";
import BgIcon from "@/assets/profile-card/profile-card-bg-icon.svg";
import ShareIcon from "@/assets/profile-card/share.svg";
import { useUserStore } from "@/store/user-store";

import Modal from "../@common/portal/modal";

import TagItem from "./tag-item";

export default function ExportProfileCard() {
  const [showProfileCardModal, setShowProfileCardModal] = useState(false);

  const userInfo = useUserStore().userInformation;

  const handleClick = () => {
    setShowProfileCardModal((prev) => !prev);
  };

  const tempGoals = [
    "자바스킙트로 웹 서비스 만들기",
    "디자인 시스템 강의 듣기",
  ];
  const tempTags = ["Javascript", "배우고있는"];

  return (
    <>
      <button
        type="button"
        className="flex h-48 w-232 items-center justify-center gap-x-4"
        onClick={handleClick}
      >
        <ExportIcon />
        <p className="text-base font-semibold text-dark-blue-500">
          내 카드 내보내기
        </p>
      </button>
      <Modal.Root
        open={showProfileCardModal}
        onOpenChange={setShowProfileCardModal}
      >
        <Modal.Content
          className="!border-none !bg-transparent !shadow-none"
          hasCloseIcon={false}
        >
          <div className="flex flex-col items-center">
            <div className="relative !h-580 !w-370 overflow-hidden !rounded-24 !border-none bg-dark-blue-500 !px-36 pt-40 text-white shadow-xl">
              <div className="flex w-full flex-col items-center">
                <div className="size-48 rounded-full bg-red-300" />
                <h3 className="mt-8 text-4xl font-bold">{userInfo?.name}</h3>
                <div className="mt-24 flex flex-col items-center gap-y-24">
                  <div>
                    <div className="flex items-center text-lg">
                      <p className="text-xl font-bold">
                        <span className="pr-5 text-3xl font-bold text-red-200">
                          34일
                        </span>
                        째 목표 달성 도전 중
                      </p>
                    </div>
                    <div className="pt-20 text-center text-base font-normal">
                      <p>전체 완료된 목표 수: 150개</p>
                      <p>하루 평균 할 일 완료 개수: 6개</p>
                    </div>
                  </div>
                  <div className="space-y-12">
                    <div className="flex -translate-x-10 items-center justify-center gap-x-8">
                      <FlagIcon />
                      <p className="text-xl font-bold">최근 목표</p>
                    </div>
                    <ul className="text-center text-base font-normal">
                      {tempGoals.map((goal) => (
                        <li key={goal}>· {goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-12">
                    <div className="flex items-center justify-center gap-x-8">
                      <HashIcon />
                      <p className="text-xl font-bold">많이 사용하는 태그</p>
                    </div>
                    <ul className="flex justify-center gap-x-4">
                      {tempTags.map((tag) => (
                        <TagItem tag={tag} key={tag} />
                      ))}
                    </ul>
                    <div className="text-center text-base font-normal" />
                  </div>
                </div>
              </div>
              <BgIcon className="absolute bottom-0 left-0" />
            </div>
            <div className="pt-27">
              <div className="flex gap-x-12">
                <button
                  type="button"
                  className="flex size-72 items-center justify-center rounded-8 bg-white shadow-xl"
                >
                  <SaveIcon />
                </button>
                <button
                  type="button"
                  className="flex size-72 items-center justify-center rounded-8 bg-white shadow-xl"
                >
                  <ShareIcon />
                </button>
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
