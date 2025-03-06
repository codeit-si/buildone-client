import { Dispatch, SetStateAction } from "react";

import { useDeleteTodo } from "@/hooks/query/use-todo";

import Popup from "../@common/portal/popup";

export default function TodoDeletePopup({
  todoId,
  todoTitle,
  isDeletePopupOpen,
  setIsDeletePopupOpen,
}: {
  todoId: number;
  todoTitle: string;
  isDeletePopupOpen: boolean;
  setIsDeletePopupOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate } = useDeleteTodo();
  return (
    <div className="ml-auto">
      <Popup.Root open={isDeletePopupOpen} onOpenChange={setIsDeletePopupOpen}>
        <Popup.Trigger className="hidden">삭제하기</Popup.Trigger>
        <Popup.Content>
          <div className="flex flex-col items-center justify-center text-base font-medium text-slate-800">
            <span className="mb-10 line-clamp-1 font-bold">
              &quot;{todoTitle}&quot;
            </span>
            <span>이 할 일을 삭제하시겠어요?</span>
            <span>삭제된 할 일은 복구할 수 없습니다.</span>
          </div>
          <Popup.Footer>
            <Popup.Close variant="outlined" className="text-base font-semibold">
              취소
            </Popup.Close>
            <Popup.Close
              size="sm"
              onClick={() => mutate(todoId)}
              className="text-base font-semibold"
            >
              삭제
            </Popup.Close>
          </Popup.Footer>
        </Popup.Content>
      </Popup.Root>
    </div>
  );
}
