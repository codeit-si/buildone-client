"use client";

import { useState } from "react";

import ExportIcon from "@/assets/export.svg";

import ProfileCardModal from "./profile-card-modal";

export default function ExportProfileCardButton() {
  const [showProfileCardModal, setShowProfileCardModal] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleExportProfileCardClick = () => {
    setShouldFetch(true);
    setShowProfileCardModal(true);
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
      <ProfileCardModal
        open={showProfileCardModal}
        onOpenChange={setShowProfileCardModal}
        shouldFetch={shouldFetch}
      />
    </>
  );
}
