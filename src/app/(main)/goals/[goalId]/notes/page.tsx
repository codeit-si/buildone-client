"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import FlagGoalSmall from "@/assets/icons-big/flag_goal_small.svg";
import Card from "@/components/note/card";
import { getNotesByGoalIdOptions } from "@/services/goal/note/query";
import "@/styles/note.css";

export default function NoteCollection() {
  const { goalId } = useParams();

  const { data, isLoading, error } = useQuery(
    getNotesByGoalIdOptions({ goalId: Number(goalId), size: 10 }),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading notes.</div>;

  return (
    <div className="container-width ml-80 mt-24">
      <div className="mb-16 text-lg font-semibold">노트 모아보기</div>
      <div className="flex h-52 items-center rounded-12 bg-white pb-14 pl-24 pr-24 pt-14">
        <FlagGoalSmall className="h-24 w-24" />
        <span className="ml-8 text-sm font-semibold">
          자바스크립트로 웹 서비스 만들기
        </span>
      </div>
      {data?.notes.map((note) => <Card key={note.id} note={note} />)}
    </div>
  );
}
