"use client";

import { useState } from "react";

import ExportIcon from "@/assets/export.svg";
import FlagIcon from "@/assets/flag.svg";
import { useUserStore } from "@/store/user-store";

import Modal from "../@common/portal/modal";

export default function ExportProfileCard() {
  const [showProfileCardModal, setShowProfileCardModal] = useState(false);

  const userInfo = useUserStore().userInformation;

  const handleClick = () => {
    setShowProfileCardModal((prev) => !prev);
  };

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
          className="!h-588 !w-384 bg-dark-blue-500 !px-36 text-white"
          hasCloseIcon={false}
        >
          <h3 className="text-4xl font-bold">{userInfo?.name}</h3>
          <div className="mt-20 space-y-24">
            <div>
              <div className="flex items-center gap-x-8 pb-16 text-lg">
                <FlagIcon />
                <p className="text-xl font-semibold">
                  <span className="pr-5 text-3xl font-semibold text-[#32FFEA]">
                    34일
                  </span>
                  째 목표 달성 도전 중
                </p>
              </div>
              <div className="pl-10 text-xl font-semibold">
                <p>전체 완료된 목표 수: 150개</p>
                <p>하루 평균 할 일 완료 개수: 6개</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-8 pb-16 text-lg">
                <FlagIcon />
                <p className="text-xl font-semibold">최근 목표</p>
              </div>
              <div className="pl-10 text-base">
                <p>· 자바스크립트로 웹 서비스 만들기</p>
                <p>· 디자인 시스템 강의 듣기</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-8 pb-16 text-lg">
                <FlagIcon />
                <p className="text-xl font-semibold">많이 사용하는 태그</p>
              </div>
              <div className="pl-10 text-base">
                <p>· 프론트엔드</p>
                <p>· 운동</p>
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
