// import StreakBoard from "@/components/dashboard/streak-board/streak-board";

import SectionContainer from "../section-container";

import MyProgress from "./my-progress";

export default async function MyProgressContainer() {
  return (
    <SectionContainer className="bg-dark-blue-500">
      <MyProgress />
      {/* <StreakBoard /> */}
    </SectionContainer>
  );
}
