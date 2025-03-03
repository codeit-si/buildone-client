"use client";

import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

import { GoalResponse } from "@/types/goal";
import { TodoResponse } from "@/types/todo";

import Modal from "../portal/modal";
import Popup from "../portal/popup";

import TodoFormProvider from "./todo-form-provider";
import TodoModalForm from "./todo-modal-form";

interface TodoModalProps {
  goalId?: GoalResponse["id"];
  todo?: TodoResponse;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function TodoModal({
  children,
  goalId,
  todo,
  open,
  onOpenChange = () => {},
}: PropsWithChildren<TodoModalProps>) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      {/* 모달 상단의 X버튼을 누르면 팝업이 나오는데 이 부분은 따로 구현하겠습니다. (지금은은 바로 닫힙니다.) */}
      <Modal.Content
        className="z-30 h-full"
        setHandler={setIsPopupOpen}
        closeOnOverlayClick={false}
      >
        <Modal.Title>할일 생성</Modal.Title>
        <TodoFormProvider todo={todo}>
          <TodoModalForm
            goalId={goalId}
            todo={todo}
            onOpenChange={onOpenChange}
          />
        </TodoFormProvider>
        <Popup.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popup.Content className="z-50">
            <div className="text-base/19 flex flex-col items-center justify-center font-medium">
              <span>정말 나가시겠어요?</span>
              <span>작성된 내용이 모두 삭제됩니다.</span>
            </div>
            <Popup.Footer>
              <Popup.Close
                variant="outlined"
                onClick={() => setIsPopupOpen(false)}
              >
                취소
              </Popup.Close>
              <Popup.Close
                onClick={() => {
                  setIsPopupOpen(false);
                  onOpenChange(false);
                }}
              >
                확인
              </Popup.Close>
            </Popup.Footer>
          </Popup.Content>
        </Popup.Root>
      </Modal.Content>
    </Modal.Root>
  );
}
