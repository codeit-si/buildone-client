"use client";

import Modal from "@/components/@common/modal/modal";

const DashboardPage = () => {
  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
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
            <Modal.Close className="h-48 w-120 border-2 border-black">
              확인
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
        <Modal.Overlay className="bg-gray-500" closeOnOverlyClick />
      </Modal.Portal>
    </Modal.Root>
  );
};

export default DashboardPage;
