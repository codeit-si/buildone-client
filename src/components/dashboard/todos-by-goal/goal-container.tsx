import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/cn";
import { WithClassName } from "@/types/dashboard";

export default function GoalContainer({
  children,
  className = "",
  ...props
}: PropsWithChildren<WithClassName & HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "rounded-32 bg-slate-50 p-24 hover:bg-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
