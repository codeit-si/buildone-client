import PlusIcon from "@/components/@svgr/plus-icon";
import { cn } from "@/lib/cn";

interface TodoModalOpenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function TodoModalOpenButton({
  className,
  ...props
}: TodoModalOpenButtonProps) {
  return (
    <button
      type="button"
      aria-label="할일 추가하기"
      className={cn(
        "flex cursor-pointer items-center gap-4 text-sm font-semibold text-dark-blue-500 hover:drop-shadow",
        className,
      )}
      {...props}
    >
      <PlusIcon stroke="dark-blue" />
      할일 추가
    </button>
  );
}
