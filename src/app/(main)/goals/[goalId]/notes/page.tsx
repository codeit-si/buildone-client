"use client";

import Card from "@/components/note/card";

import FlagGoalSmall from "@/assets/flag_goal_small.svg";
import "@/styles/note.css";

export default function NoteCollection() {
  return (
    <div className="container-width ml-80 mt-24">
      <div className="text-lg font-semibold">노트 모아보기</div>
      <div className="flex h-52 items-center rounded-12 bg-white pb-14 pl-24 pr-24 pt-14">
        <FlagGoalSmall className="h-24 w-24" />
        <span className="ml-8 text-sm font-semibold">
          자바스크립트로 웹 서비스 만들기
        </span>
      </div>
      <Card />
    </div>
  );
}
