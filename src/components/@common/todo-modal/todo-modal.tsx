"use client";

import { Dispatch, PropsWithChildren, SetStateAction } from "react";

import { GoalResponse, TodoResponse } from "@/types/dashboard";

import Modal from "../portal/modal";

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
  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      {/* 모달 상단의 X버튼을 누르면 팝업이 나오는데 이 부분은 따로 구현하겠습니다. (지금은은 바로 닫힙니다.) */}
      <Modal.Content className="h-full">
        <Modal.Title>할일 생성</Modal.Title>
        <TodoFormProvider todo={todo}>
          <TodoModalForm
            goalId={goalId}
            todo={todo}
            onOpenChange={onOpenChange}
          />
        </TodoFormProvider>
      </Modal.Content>
    </Modal.Root>
  );
}
