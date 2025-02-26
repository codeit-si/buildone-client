import DeleteBlue from "@/assets/delete_purple.svg";
import ButtonVariants from "@/components/@common/button";

interface LoadNoteToastProps {
  onClose: () => void;
  onLoad: () => void;
}

export default function LoadNoteToast({ onClose, onLoad }: LoadNoteToastProps) {
  return (
    <div
      className="container-width mb-24 h-60 rounded-28 bg-dark-blue-100 md:h-56"
      aria-label="임시 저장 노트 로드 토스트"
    >
      <div className="flex items-center justify-between px-12 py-10">
        <div className="flex items-center">
          <DeleteBlue
            onClick={onClose}
            className="ml-4 mr-16 h-24 w-24 cursor-pointer"
            aria-label="삭제 아이콘 (토스트 닫기)"
          />
          <span className="ml-12 flex-1 text-sm font-semibold text-dark-blue-500 md:flex-none">
            임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
          </span>
        </div>
        <ButtonVariants
          variant="outlined"
          shape="round"
          size="sm"
          className="whitespace-nowrap bg-white"
          onClick={onLoad}
        >
          불러오기
        </ButtonVariants>
      </div>
    </div>
  );
}
