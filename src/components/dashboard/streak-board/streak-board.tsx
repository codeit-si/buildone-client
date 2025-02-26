"use client";

import ProgressIcon from "@/assets/progress.svg";

export default function StreakBoard(): JSX.Element {
  const pastDays = 365;
  const boxesPerColumn = 7;
  const totalColumns = Math.ceil(pastDays / boxesPerColumn);

  // 오늘을 마지막 날로, 시작일은 오늘 - (365 - 1)일
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - (pastDays - 1));

  // 임시 데이터: 지난 365일에 대한 완료한 할 일 개수 (실제 데이터로 대체 가능)
  const dailyCounts = Array.from({ length: pastDays }, () =>
    Math.floor(Math.random() * 12),
  );

  const getBoxColor = (count: number): string => {
    if (count === 0) return "bg-slate-300";
    if (count >= 1 && count <= 2) return "bg-dark-blue-200";
    if (count >= 3 && count <= 4) return "bg-dark-blue-400";
    if (count >= 5 && count <= 6) return "bg-dark-blue-600";
    if (count >= 7 && count <= 9) return "bg-dark-blue-800";
    if (count >= 10) return "bg-dark-blue-900";
    return "bg-slate-300";
  };

  const renderStreakBoard = () => {
    return Array.from({ length: totalColumns }, (_col, colIndex) => {
      const columnBoxes = Array.from(
        { length: boxesPerColumn },
        (_row, rowIndex) => {
          const boxIndex = colIndex * boxesPerColumn + rowIndex;
          // 365일을 초과하는 경우는 렌더링 x
          if (boxIndex >= pastDays) return null;

          const count = dailyCounts[boxIndex];
          const boxColor = getBoxColor(count);

          return (
            <div
              key={boxIndex}
              className={`mb-5 h-18 w-18 rounded-4 ${boxColor}`}
            />
          );
        },
      ).filter(Boolean);

      return (
        <div key={colIndex} className="mr-5 flex flex-col">
          {columnBoxes}
        </div>
      );
    });
  };

  return (
    <div className="mx-8 mb-24">
      {/* 진행 상황 헤더 */}
      <div className="mb-14 flex items-center">
        <ProgressIcon className="mr-11 h-40 w-40" aria-label="아이콘" />
        <span
          className="text-lg font-semibold"
          style={{ fontWeight: 600, fontSize: "18px" }}
        >
          내 진행상황
        </span>
      </div>

      {/* 스트릭 보드 */}
      <div className="scrollbar-horizontality flex overflow-x-auto">
        {renderStreakBoard()}
      </div>
    </div>
  );
}
