"use client";

import NoteListIcon from "@/assets/notelist.svg";
import Dropdown from "@/components/dropdown";
import Todo from "@/containers/note/todo";

function NoteCard() {
  return (
    <div className="mt-16 h-164 w-full rounded-12 bg-white p-24">
      <div className="flex h-44 justify-between">
        <NoteListIcon className="h-28 w-28" />
        <Dropdown
          items={[
            { label: "수정하기", onClick: () => "" },
            { label: "삭제하기", onClick: () => "" },
          ]}
        />
      </div>

      <div className="h-40 border-b border-b-slate-200 font-medium">
        자바스크립트를 배우기 전 알아두어야 할 것
      </div>

      <div className="h-32 pt-11">
        <Todo todoText="자바스크립트 기초 챕터1 듣기" />
      </div>
    </div>
  );
}

export default NoteCard;
