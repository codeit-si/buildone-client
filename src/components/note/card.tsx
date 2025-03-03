"use client";

import { useState } from "react";

import Dropdown from "@/components/@common/dropdown";
import Modal from "@/components/@common/portal/modal";
import Sheet from "@/components/@common/portal/sheet";
import DetailSheet from "@/components/note/detail-sheet";
import { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps): JSX.Element | null {
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isDeleted) return null;

  return (
    <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
      <div className="mt-16 h-164 w-full rounded-12 bg-white p-24">
        <div className="flex h-44 justify-between">
          <div className="flex h-24 w-45 items-center justify-center rounded-16 border border-dark-blue-300 bg-dark-blue-100 px-3 py-2 text-xs font-medium">
            To do
          </div>
          <Dropdown
            items={[
              { label: "수정하기", onClick: (): void => {} },
              { label: "삭제하기", onClick: (): void => setModalOpen(true) },
            ]}
          />
        </div>

        <Sheet.Root open={sheetOpen} onOpenChange={setSheetOpen}>
          <DetailSheet noteId={note.id} />
          <Sheet.Trigger className="h-40 w-full border-b border-b-slate-200 text-left font-medium">
            {note.title}
          </Sheet.Trigger>
        </Sheet.Root>

        <div className="h-32 pt-11 text-xs font-normal">
          {note.todoInformation.title}
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
            <Modal.Close variant="outlined" className="w-120 min-w-120">
              취소
            </Modal.Close>
            <Modal.Close
              variant="solid"
              className="w-120 min-w-120"
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
