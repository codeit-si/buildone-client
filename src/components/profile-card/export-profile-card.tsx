"use client";

import { useRef, useState } from "react";

import { saveAs } from "file-saver";
import { domToBlob } from "modern-screenshot";

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
  const cardRef = useRef<HTMLDivElement>(null);

  const userInfo = useUserStore().userInformation;

  const handleExportProfileCardClick = () => {
    setShowProfileCardModal((prev) => !prev);
  };

  const tempGoals = [
    "자바스크립트로 웹 서비스 만들기",
    "디자인 시스템 강의 듣기",
  ];
  const tempTags = ["Javascript", "배우고있는"];

  const handleSave = () => {
    if (cardRef.current) {
      domToBlob(cardRef.current, { scale: 2 }).then((blob) => {
        saveAs(blob, `${userInfo?.name}'s profile-card.png`);
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex h-48 w-232 items-center justify-center gap-x-4"
        onClick={handleExportProfileCardClick}
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
          className="!md:rounded-24 h-auto w-auto !gap-0 !rounded-18 !border-none !bg-transparent !p-0 !shadow-none"
          hasCloseIcon={false}
        >
          <div className="flex flex-col items-center">
            <div
              ref={cardRef}
              className="relative h-424 w-271 overflow-hidden rounded-18 border-none bg-dark-blue-500 px-36 pt-30 text-white shadow-xl md:h-580 md:w-370 md:rounded-24 md:pt-40"
            >
              <div className="flex w-full flex-col items-center whitespace-nowrap">
                <div className="size-36 rounded-full bg-red-300 md:size-48" />
                <h3 className="mt-4 text-26 font-bold md:mt-8 md:text-36">
                  {userInfo?.name}
                </h3>
                <div className="mt-17 flex flex-col items-center gap-y-18 md:mt-24 md:gap-y-24">
                  <div className="space-y-8 md:space-y-12">
                    <div className="flex items-center justify-center">
                      <p className="text-14 font-bold md:text-18">
                        <span className="pr-5 text-24 font-bold text-red-200 md:text-32">
                          34일
                        </span>
                        째 목표 달성 도전 중
                      </p>
                    </div>
                    <div className="text-center text-xs font-normal leading-normal md:text-base md:leading-6">
                      <p>전체 완료된 목표 수: 150개</p>
                      <p>하루 평균 할 일 완료 개수: 6개</p>
                    </div>
                  </div>
                  <div className="space-y-8 md:space-y-12">
                    <div className="flex -translate-x-10 items-center justify-center gap-x-5 md:gap-x-8">
                      <FlagIcon className="h-19 w-18 md:size-24" />
                      <p className="text-base font-bold md:text-xl">
                        최근 목표
                      </p>
                    </div>
                    <ul className="text-center text-xs font-normal leading-normal md:text-base md:leading-6">
                      {tempGoals.map((goal) => (
                        <li key={goal}>· {goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-8 md:space-y-12">
                    <div className="flex items-center justify-center gap-x-4 md:gap-x-8">
                      <HashIcon className="size-18 md:size-24" />
                      <p className="text-base font-bold md:text-xl">
                        많이 사용하는 태그
                      </p>
                    </div>
                    <ul className="flex justify-center gap-x-6 md:gap-x-8">
                      {tempTags.map((tag) => (
                        <TagItem tag={tag} key={tag} />
                      ))}
                    </ul>
                    <div className="text-center text-xs font-normal md:text-base" />
                  </div>
                </div>
              </div>
              <BgIcon className="absolute bottom-0 left-0 h-153 w-98 md:h-209 md:w-134" />
            </div>
            <div className="pt-17 md:pt-27">
              <div className="flex gap-x-10 md:gap-x-12">
                <button
                  type="button"
                  className="flex size-52 items-center justify-center rounded-8 bg-white shadow-xl transition-transform hover:-translate-y-3 md:size-72"
                  onClick={handleSave}
                >
                  <SaveIcon className="flex size-30 items-center justify-center md:size-40" />
                </button>
                <button
                  type="button"
                  className="flex size-52 items-center justify-center rounded-8 bg-white shadow-xl transition-transform hover:-translate-y-3 md:size-72"
                >
                  <ShareIcon className="flex size-30 items-center justify-center md:size-40" />
                </button>
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
