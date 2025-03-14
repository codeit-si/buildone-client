"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import EllipseIcon from "@/assets/icons-small/ellipse.svg";
import { getTodoStreak } from "@/services/dashboard";
import { DashboardStreakResponse } from "@/types/dashboard";

export default function StreakBoard() {
  const { data } = useSuspenseQuery<DashboardStreakResponse, Error>({
    queryKey: ["todoStreak"],
    queryFn: getTodoStreak,
  });

  // historyStreaks: 지난 364일 데이터, weekStreaks: 이번 주 지난 요일 데이터
  const historyStreaks = data?.historyStreaks || [];
  const weekStreaks = data?.weekStreaks || [];

  const boxesPerColumn = 7;
  const pastColumns = Math.floor(historyStreaks.length / boxesPerColumn);

  const getBoxColor = (count: number): string => {
    if (count === 0) return "bg-slate-300";
    if (count >= 1 && count <= 2) return "bg-dark-blue-200";
    if (count >= 3 && count <= 4) return "bg-dark-blue-400";
    if (count >= 5 && count <= 6) return "bg-dark-blue-600";
    if (count >= 7 && count <= 9) return "bg-dark-blue-800";
    if (count >= 10) return "bg-dark-blue-900";
    return "bg-slate-300";
  };

  const renderPastBoard = () => {
    return Array.from({ length: pastColumns }, (dummyCol, colIndex) => {
      const columnBoxes = Array.from(
        { length: boxesPerColumn },
        (dummyRow, rowIndex) => {
          const boxIndex = colIndex * boxesPerColumn + rowIndex;
          const day = historyStreaks[boxIndex];
          const count = day ? day.count : 0;
          const boxColor = getBoxColor(count);
          return (
            <div
              key={day?.date || `past-${colIndex}-${rowIndex}`}
              className={`mb-5 h-18 w-18 rounded-4 ${boxColor}`}
            />
          );
        },
      );
      return (
        <div
          key={
            historyStreaks[colIndex * boxesPerColumn]?.date || `col-${colIndex}`
          }
          className="mr-5 flex flex-col"
        >
          {columnBoxes}
        </div>
      );
    });
  };

  const renderCurrentWeek = () => {
    const columnBoxes = Array.from(
      { length: weekStreaks.length },
      (dummyRow, rowIndex) => {
        const day = weekStreaks[rowIndex];
        const boxColor = getBoxColor(day.count);
        return (
          <div
            key={day.date}
            className={`mb-5 h-18 w-18 rounded-4 ${boxColor}`}
          />
        );
      },
    );
    return <div className="flex flex-col">{columnBoxes}</div>;
  };

  return (
    <div className="w-full">
      {/* 진행 상황 헤더 */}
      <div className="mb-14 flex items-center gap-16">
        <div className="flex h-40 w-40 items-center justify-center rounded-15 bg-[#0F172A]">
          <EllipseIcon />
        </div>
        <span className="text-lg font-semibold">내 진행상황</span>
      </div>

      {/* 스트릭 보드 */}
      <div className="scrollbar-horizontality flex overflow-x-auto pr-5">
        {renderPastBoard()}
        {renderCurrentWeek()}
      </div>
    </div>
  );
}
