"use client";

import { MouseEvent, PropsWithChildren, useState } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import useSelector from "@/hooks/use-selector";
import { getInfiniteGoalsOptions } from "@/services/dashboard/query";
import { GoalResponse } from "@/types/dashboard";

import Button from "./button";
import Input from "./input";
import Modal from "./portal/modal";

type SelectOptionType = "upload-file" | "attach-link";

interface CreateTodoModalProps {
  goalId?: GoalResponse["id"];
}

export default function CreateTodoModal({
  children,
  goalId,
}: PropsWithChildren<CreateTodoModalProps>) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    getInfiniteGoalsOptions({ size: 10 }),
  );
  const { ref: scrollRef } = useInfiniteScroll({ hasNextPage, fetchNextPage });
  const { isOpen, ref, toggleHandler } = useSelector();

  const [selectOption, setSelectOption] =
    useState<SelectOptionType>("upload-file");
  const [selectedGoalId, setSelectedGoalId] = useState<number>(goalId ?? -1);

  const goalTitle = data?.pages.find(
    (page) => page.id === selectedGoalId,
  )?.title;

  const handleChangeOption = (value: SelectOptionType) => {
    setSelectOption(value);
  };

  const handleSelectGoal = (e: MouseEvent<HTMLButtonElement>) => {
    const dataset = e.currentTarget.dataset as { goalId: string };
    const goalIdData = dataset.goalId;
    setSelectedGoalId(Number(goalIdData));
  };

  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>할일 생성</Modal.Title>
        <form>
          <Input
            className="md:w-full"
            id="create-todo-title"
            label="제목"
            placeholder="할일 제목을 적어주세요."
          />
          <div>
            <h4>자료</h4>
            <ul className="flex gap-8">
              <li data-type="upload-file">
                <Button onClick={() => handleChangeOption("upload-file")}>
                  파일 업로드드
                </Button>
              </li>
              <li data-type="attach-link">
                <Button onClick={() => handleChangeOption("attach-link")}>
                  링크 첨부
                </Button>
              </li>
            </ul>
          </div>
          <div>
            {selectOption === "upload-file" && <div>파일 인풋 자리리</div>}
            {selectOption === "attach-link" && (
              <Input
                id="attach-todo-link"
                label="링크"
                placeholder="링크를 적어주세요."
              />
            )}
          </div>
          <div
            role="presentation"
            ref={ref}
            onClick={toggleHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleHandler();
              }
            }}
          >
            <h4>목표</h4>
            <span>{goalTitle ?? "목표를 선택해주세요."}</span>
            {isOpen && (
              <ul className="h-100 overflow-auto bg-slate-100">
                {data?.pages.map((page) => (
                  <li key={`create-todo-modal-${page.id}`}>
                    <button
                      type="button"
                      data-goalId={page.id}
                      onClick={handleSelectGoal}
                    >
                      {page.title}
                    </button>
                  </li>
                ))}
                <div ref={scrollRef}>로딩 중</div>
              </ul>
            )}
          </div>
          <Button>확인</Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
