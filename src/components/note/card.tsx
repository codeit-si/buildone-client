"use client";

import { useState } from "react";

import NoteListIcon from "@/assets/notelist.svg";
import Dropdown from "@/components/@common/dropdown";
import Modal from "@/components/@common/portal/modal";
import Todo from "@/components/note/todo";
import "@/styles/modal-size.css";

export default function NoteCard(): JSX.Element | null {
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

        <div className="h-40 border-b border-b-slate-200 font-medium">
          자바스크립트를 배우기 전 알아두어야 할 것
        </div>

        <div className="h-32 pt-11">
          <Todo todoText="자바스크립트 기초 챕터1 듣기" />
        </div>

        <Modal.Content className="modal-size">
          <div className="mb-16 text-center text-base font-medium text-slate-800">
            노트를 삭제하시겠어요? 삭제된 노트는 복구할 수 없습니다.
          </div>
          <Modal.Footer>
            <Modal.Close className="modal-btn" variant="solid">
              취소
            </Modal.Close>
            <Modal.Close
              className="modal-btn"
              variant="solid"
              onClick={(): void => {
                setIsDeleted(true);
              }}
            >
              삭제
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </div>
    </Modal.Root>
  );
}
