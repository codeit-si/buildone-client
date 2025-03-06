// import StreakBoard from "@/components/dashboard/streak-board/streak-board";

import EllipseIcon from "@/assets/icons-big/ellipse.svg";

import SectionContainer from "../section-container";

import MyProgress from "./my-progress";

export default async function MyProgressContainer() {
  return (
    <SectionContainer className="bg-dark-blue-500">
      <div className="relative h-full w-full">
        <MyProgress />
        <div className="absolute -bottom-16 -right-16">
          <EllipseIcon />
        </div>
      </div>
      {/* <StreakBoard /> */}
    </SectionContainer>
  );
}
