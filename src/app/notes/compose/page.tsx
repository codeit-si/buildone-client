"use client";

import { ChangeEvent, useState } from "react";

import Button from "@/components/button";
import Counting from "@/components/counting";
import Goal from "@/containers/note/goal";
import Tiptap from "@/containers/note/tiptap";
import Todo from "@/containers/note/todo";
import "@/styles/note.css";
import { countWithoutSpaces, countWithSpaces } from "@/utils/text-utils";

export default function ComposePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="ml-16 mt-24 md:ml-24 lg:ml-80">
      <div className="container-width">
        {/* 헤더 */}
        <div className="grid h-44 grid-cols-[162px_auto] items-center">
          <h1 className="truncate text-lg font-semibold text-slate-900">
            노트 작성
          </h1>
          <div className="flex justify-end gap-8">
            <Button variant="outlined" size="sm" shape="square">
              임시저장
            </Button>
            <Button variant="solid" size="sm" shape="square">
              작성 완료
            </Button>
          </div>
        </div>

        <div className="mt-16">
          {/* 목표 표시 */}
          <Goal goalText="자바스크립트로 웹 서비스 만들기" />

          {/* To do 항목 */}
          <Todo todoText="자바스크립트 기초 챕터1 듣기" />

          {/* 노트 제목 입력 */}
          <div className="flex items-center gap-8">
            <input
              type="text"
              className="h-52 w-full border-b border-t border-slate-200 text-lg placeholder:text-lg focus:outline-none"
              placeholder="노트의 제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
            />
            <Counting type="title" count={title.length} total={50} />
          </div>

          {/* 에디터 영역 */}
          <div className="mt-12">
            <Counting
              type="text"
              count={countWithoutSpaces(content)}
              total={countWithSpaces(content)}
            />
            <div className="mt-16">
              <Tiptap setContents={setContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
