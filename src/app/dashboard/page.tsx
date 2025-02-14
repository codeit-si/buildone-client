"use client";

import Modal from "@/components/@common/modal/modal";

const DashboardPage = () => {
  return (
    <Modal.Root>
      <Modal.Trigger className="bg-blue-500 text-white rounded-md px-4 py-2">
        Open Modal
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content type="modal">
          {/* <Modal.Title asChild>
            <h3>할 일 생성</h3>
          </Modal.Title> */}
          <Modal.Description className="flex flex-col items-center justify-center">
            <span>정말 나가시겠어요?</span>
            <span>작성된 내용이 모두 삭제됩니다.</span>
          </Modal.Description>
          <Modal.Footer className="mt-16">
            <Modal.Close className="border-black h-48 w-120 border-2">
              확인
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
        <Modal.Overlay className="bg-gray-500" closeOnOverlayClick />
      </Modal.Portal>
    </Modal.Root>
  );
};

export default DashboardPage;
