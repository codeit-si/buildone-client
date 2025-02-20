import { MouseEvent } from "react";

interface DropdownItemProps {
  label: string;
  onClick: (e: MouseEvent) => void;
  isFocus: boolean;
}

export default function DropdownItem({
  onClick,
  label,
  isFocus,
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className="font-slate-700 flex h-34 w-full items-center justify-center px-2 text-sm hover:bg-slate-100 md:px-4"
      ref={(node) => {
        if (isFocus) node?.focus();
      }}
    >
      {label}
    </button>
  );
}
