"use client";

import { cn } from "@/lib/cn";

interface ToolbarButtonProps {
  onClick: () => void;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ariaLabel: string;
  isActive: boolean;
}

export default function ToolbarButton({
  onClick,
  IconComponent,
  ariaLabel,
  isActive,
}: ToolbarButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={cn("mr-4 h-25 w-25 rounded p-2", { "bg-slate-400": isActive })}
    >
      <IconComponent className="h-25 w-25" aria-label={ariaLabel} />
    </button>
  );
}
