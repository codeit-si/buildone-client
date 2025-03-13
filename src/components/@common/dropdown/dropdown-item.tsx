import { HTMLAttributes } from "react";

interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  isFocus: boolean;
}

export default function DropdownItem({
  label,
  isFocus,
  ...props
}: DropdownItemProps) {
  return (
    <button
      role="menuitem"
      className="font-slate-700 z-50 flex h-34 w-full items-center justify-center px-2 text-sm hover:bg-slate-100 md:px-4"
      ref={(node) => {
        if (isFocus) node?.focus();
      }}
      {...props}
    >
      {label}
    </button>
  );
}
