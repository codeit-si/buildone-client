"use client";

import { useState } from "react";

import { useDeleteGoal } from "@/hooks/queries/use-goal";

import Dropdown from "../@common/dropdown/dropdown";
import Popup from "../@common/portal/popup";

interface GoalSummaryDropdownProps {
  goalId: string;
  setTitleEditing: (edit: boolean) => void;
}

export default function GoalSummaryDropdown({
  goalId,
  setTitleEditing,
}: GoalSummaryDropdownProps) {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const { mutate: deleteGoal } = useDeleteGoal();

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => setTitleEditing(true),
    },
    {
      label: "삭제하기",
      onClick: () => {
        setPopupOpen(true);
      },
    },
  ];

  const handleGoalDelete = () => {
    deleteGoal(Number(goalId));
  };

  return (
    <div className="ml-auto">
      <Dropdown items={dropdownItems} />
      <Popup.Root open={popupOpen} onOpenChange={setPopupOpen}>
        <Popup.Trigger className="hidden">삭제하기</Popup.Trigger>
        <Popup.Content>
          <div className="flex flex-col items-center justify-center text-base font-medium text-slate-800">
            <span>목표를 삭제하시겠어요?</span>
            <span> 삭제된 목표는 복구할 수 없습니다.</span>
          </div>
          <Popup.Footer>
            <Popup.Close variant="outlined" className="text-base font-semibold">
              취소
            </Popup.Close>
            <Popup.Close
              size="sm"
              onClick={handleGoalDelete}
              className="text-base font-semibold"
            >
              삭제
            </Popup.Close>
          </Popup.Footer>
        </Popup.Content>
      </Popup.Root>
    </div>
  );
}
