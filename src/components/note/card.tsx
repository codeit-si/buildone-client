"use client";

import { useState } from "react";

import NoteListIcon from "@/assets/notelist.svg";
import Dropdown from "@/components/@common/dropdown";
import Modal from "@/components/@common/portal/modal";
import Sheet from "@/components/@common/portal/sheet";
import DetailSheet from "@/components/note/detail-sheet";
import Todo from "@/components/note/todo";

export default function NoteCard(): JSX.Element | null {
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isDeleted) return null;

  return (
    <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
      <div className="mt-16 h-164 w-full rounded-12 bg-white p-24">
        <div className="flex h-44 justify-between">
          <NoteListIcon className="h-28 w-28" />
          <Dropdown
            items={[
              { label: "수정하기", onClick: (): void => {} },
              {
                label: "삭제하기",
                onClick: (): void => setModalOpen(true),
              },
            ]}
          />
        </div>

        <Sheet.Root open={sheetOpen} onOpenChange={setSheetOpen}>
          <DetailSheet />
          <Sheet.Trigger className="h-40 w-full border-b border-b-slate-200 text-left font-medium">
            자바스크립트를 배우기 전 알아두어야 할 것
          </Sheet.Trigger>
        </Sheet.Root>

        <div className="h-32 pt-11">
          <Todo todoText="자바스크립트 기초 챕터1 듣기" />
        </div>

        <Modal.Content
          hasCloseIcon={false}
          className="h-216 w-300 rounded-lg md:w-450"
        >
          <div className="text-center text-base font-medium text-slate-800">
            노트를 삭제하시겠어요?
            <br />
            삭제된 노트는 복구할 수 없습니다.
          </div>
          <Modal.Footer>
            <Modal.Close
              variant="outlined"
              style={{ width: "120px", minWidth: "120px" }}
            >
              취소
            </Modal.Close>
            <Modal.Close
              variant="solid"
              style={{ width: "120px", minWidth: "120px" }}
              onClick={(): void => setIsDeleted(true)}
            >
              삭제
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </div>
    </Modal.Root>
  );
}
