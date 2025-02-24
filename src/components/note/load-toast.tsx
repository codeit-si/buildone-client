import DeleteBlue from "@/assets/delete_blue.svg";
import ButtonVariants from "@/components/@common/button";
import { cn } from "@/lib/cn";

interface LoadNoteToastProps {
  onClose: () => void;
  onLoad: () => void;
}

export default function LoadNoteToast({ onClose, onLoad }: LoadNoteToastProps) {
  return (
    <div
      className={cn(
        "container-width",
        "h-60",
        "md:h-56",
        "bg-blue-50",
        "rounded-28",
        "mb-24",
      )}
      aria-label="임시 저장 노트 로드 토스트"
    >
      <div
        className={cn(
          "pr-12",
          "pl-12",
          "pt-10",
          "pb-10",
          "flex",
          "items-center",
          "justify-between",
        )}
      >
        <div className="flex items-center">
          <DeleteBlue
            onClick={onClose}
            className="ml-4 mr-16 h-24 w-24 cursor-pointer"
            aria-label="삭제 아이콘 (토스트 닫기)"
          />
          <span className="ml-12 flex-1 text-sm font-semibold text-blue-500 md:flex-none">
            임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
          </span>
        </div>
        <ButtonVariants
          variant="outlined"
          shape="round"
          size="sm"
          className="whitespace-nowrap"
          onClick={onLoad}
        >
          불러오기
        </ButtonVariants>
      </div>
    </div>
  );
}
