"use client";

import Dropdown from "@/components/dropdown";

import Test2 from "./modal";
import Test3 from "./popup";
import Test from "./sheet";

const DashboardPage = () => {
  return (
    <>
      <Dropdown
        items={[
          {
            label: "수정하기",
            onClick: () => {},
          },
          {
            label: "삭제하기",
            onClick: () => {},
          },
        ]}
      />
      <Test />
      <Test2 />
      <Test3 />
    </>
  );
};

export default DashboardPage;
