"use client";

import { useState } from "react";

import FlagGoalIcon from "@/assets/flag_goal_small.svg";
import Button from "@/components/button";
import Counting from "@/components/counting";
import Tiptap from "@/components/tiptap";
import { countWithoutSpaces } from "@/utils/text-utils";

export default function ComposePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <div className="ml-16 mt-24 md:ml-24 lg:ml-80">
      <div className="w-349 md:w-636 lg:w-792">
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
          <div className="mb-12 flex">
            <FlagGoalIcon className="mr-6 h-24 w-24" />
            <div>자바스크립트로 웹 서비스 만들기</div>
          </div>

          <div className="mb-24 flex">
            <div className="flex h-20 w-37 items-center justify-center rounded-4 bg-slate-100 text-xs text-slate-700">
              To do
            </div>
            <div className="ml-8 text-sm">자바스크립트 기초 챕터1 듣기</div>
          </div>

          <div />
          <div className="flex items-center gap-8">
            <input
              type="text"
              className="h-52 w-full border-b border-t border-slate-200 text-lg placeholder:text-lg"
              placeholder="노트의 제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Counting type="title" count={title.length} total={50} />
          </div>
          <div className="mt-12">
            <Counting
              type="text"
              count={countWithoutSpaces(content)}
              total={content.length}
            />
            <div className="mt-16 text-slate-700">
              <Tiptap setContents={setContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
