"use client";

import FlagGoalSmall from "@/assets/flag_goal_small.svg";
import "@/styles/note.css";

function NoteCollection() {
  return (
    <div className="container-width ml-80 mt-24 bg-purple-500">
      <div className="mb-16 text-lg font-semibold">노트 모아보기</div>
      <div className="flex h-52 items-center rounded-12 bg-white pb-14 pl-24 pr-24 pt-14">
        <FlagGoalSmall width={24} height={24} />
        <span className="ml-8 text-sm font-semibold">
          자바스크립트로 웹 서비스 만들기
        </span>
      </div>
    </div>
  );
}

export default NoteCollection;
