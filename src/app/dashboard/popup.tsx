/* eslint-disable no-console */

"use client";

import Popup from "@/components/@common/portal/popup";

const DashboardPage = () => {
  return (
    <Popup.Root>
      <Popup.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
        Open Popup
      </Popup.Trigger>
      <Popup.Content className="">
        <div className="flex flex-col items-center justify-center">
          <span>정말 나가시겠어요?</span>
          <span>작성된 내용이 모두 삭제됩니다.</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span>정말 나가시겠어요?</span>
          <span>작성된 내용이 모두 삭제됩니다.</span>
        </div>
        <Popup.Footer>
          <Popup.Close
            variant="outlined"
            onClick={() => console.log("popup 취소")}
          >
            취소
          </Popup.Close>
          <Popup.Close onClick={() => console.log("popup 확인")}>
            확인
          </Popup.Close>
        </Popup.Footer>
      </Popup.Content>
    </Popup.Root>
  );
};

export default DashboardPage;
