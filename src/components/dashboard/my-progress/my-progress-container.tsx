import StreakBoard from "@/components/dashboard/streak-board/streak-board";

import SectionContainer from "../section-container";

import MyProgress from "./my-progress";

export default async function MyProgressContainer() {
  return (
    <SectionContainer>
      <MyProgress />
      <StreakBoard />
    </SectionContainer>
  );
}
