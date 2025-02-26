import Modal from "@/components/@common/portal/modal";

interface LoadModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  storedTitle: string;
  onLoad: () => void;
}

export default function LoadNoteModal({
  open,
  setOpen,
  storedTitle,
  onLoad,
}: LoadModalProps) {
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <div className="mt-16 h-164 w-full rounded-12 bg-white p-24">
        <Modal.Content
          hasCloseIcon={false}
          className="h-216 w-300 rounded-lg md:w-450"
        >
          <div className="text-center text-base font-medium text-slate-800">
            {storedTitle || "제목 없음"}
            <br />
            노트를 불러오시겠어요?
          </div>
          <Modal.Footer>
            <Modal.Close variant="outlined" className="w-120 min-w-120">
              취소
            </Modal.Close>
            <Modal.Close
              variant="solid"
              className="w-120 min-w-120"
              onClick={onLoad}
            >
              불러오기
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </div>
    </Modal.Root>
  );
}
