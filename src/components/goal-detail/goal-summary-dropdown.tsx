"use client";

import Dropdown from "../@common/dropdown";

export default function GoalSummaryDropdown() {
  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {},
    },
    {
      label: "삭제하기",
      onClick: () => {},
    },
  ];

  return <Dropdown items={dropdownItems} />;
}
