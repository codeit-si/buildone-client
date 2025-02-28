"use client";

import ProgressIcon from "@/assets/progress.svg";

export default function StreakBoard(): JSX.Element {
  // 지난 52주(364일)
  const pastDays = 364;
  const boxesPerColumn = 7;
  const pastColumns = 52;

  const today = new Date();
  // 오늘 요일에 따라 이번 주의 박스 개수: 일요일이면 1, 월요일이면 2, ..., 토요일이면 7
  const currentWeekBoxes = today.getDay() === 0 ? 1 : today.getDay() + 1;

  // 백엔드에서 전달받은 데이터(임시 데이터로 대체)
  const pastDailyCounts = Array.from({ length: pastDays }, () =>
    Math.floor(Math.random() * 12),
  );
  const currentWeekDailyCounts = Array.from({ length: currentWeekBoxes }, () =>
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

  const renderPastBoard = () => {
    return Array.from({ length: pastColumns }, (_col, colIndex) => {
      const columnBoxes = Array.from(
        { length: boxesPerColumn },
        (_row, rowIndex) => {
          const boxIndex = colIndex * boxesPerColumn + rowIndex;
          const count = pastDailyCounts[boxIndex];
          const boxColor = getBoxColor(count);
          return (
            <div
              key={boxIndex}
              className={`mb-5 h-18 w-18 rounded-4 ${boxColor}`}
            />
          );
        },
      );
      return (
        <div key={colIndex} className="mr-5 flex flex-col">
          {columnBoxes}
        </div>
      );
    });
  };

  const renderCurrentWeek = () => {
    const columnBoxes = Array.from(
      { length: currentWeekBoxes },
      (_row, rowIndex) => {
        const count = currentWeekDailyCounts[rowIndex];
        const boxColor = getBoxColor(count);
        return (
          <div
            key={rowIndex}
            className={`mb-5 h-18 w-18 rounded-4 ${boxColor}`}
          />
        );
      },
    );
    return <div className="flex flex-col">{columnBoxes}</div>;
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
        {renderPastBoard()}
        {renderCurrentWeek()}
      </div>
    </div>
  );
}
