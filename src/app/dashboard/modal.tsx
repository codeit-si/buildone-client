"use client";

import Sheet from "@/components/@common/portal/modal";

const DashboardPage = () => {
  return (
    <Sheet.Root>
      <Sheet.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
        Open Modal
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Content>
          {/* <Sheet.Title asChild>
            <h3>할 일 생성</h3>
          </Sheet.Title> */}
          <Sheet.Description className="flex flex-col items-center justify-center">
            <span>정말 나가시겠어요?</span>
            <span>작성된 내용이 모두 삭제됩니다.</span>
          </Sheet.Description>
          <Sheet.Footer className="mt-16">
            <Sheet.Close className="h-48 w-120 border-2 border-black">
              확인
            </Sheet.Close>
          </Sheet.Footer>
        </Sheet.Content>
        <Sheet.Overlay className="bg-gray-500" />
      </Sheet.Portal>
    </Sheet.Root>
  );
};

export default DashboardPage;
