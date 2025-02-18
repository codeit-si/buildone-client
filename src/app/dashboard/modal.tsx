"use client";

import Modal from "@/components/@common/portal/modal";

const DashboardPage = () => {
  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
        Open Modal
      </Modal.Trigger>
      <Modal.Content className="">
        <div className="flex flex-col items-center justify-center gap-4">
          <span>정말 나가시겠어요?</span>
          <span>작성된 내용이 모두 삭제됩니다.</span>
        </div>
        <Modal.Footer className="">
          <Modal.Close className="h-48 border-2 border-black">확인</Modal.Close>
        </Modal.Footer>
        <Modal.Title>Title 입니다!</Modal.Title>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DashboardPage;
