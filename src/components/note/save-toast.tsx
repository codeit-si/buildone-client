import CheckIcon from "@/assets/check.svg";
import { cn } from "@/lib/cn";

export default function TempSaveToast() {
  return (
    <div
      className={cn(
        "h-44",
        "bg-dark-blue-50",
        "rounded-28",
        "py-10",
        "px-24",
        "flex",
        "items-center",
        "fixed",
        "bottom-84",
        "sticky",
      )}
      aria-label="노트 임시 저장 토스트"
    >
      <CheckIcon className="h-24 w-24" aria-label="check icon" />
      <span className="ml-8 text-dark-blue-500">
        <span className="text-sm font-semibold">
          임시 저장이 완료되었습니다
        </span>
        <span className="text-xs font-medium"> ㆍ 1초전</span>
      </span>
    </div>
  );
}
