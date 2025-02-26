import { PropsWithChildren } from "react";

import { cn } from "@/lib/cn";
import { WithClassName } from "@/types/dashboard";

export default function GoalContainer({
  children,
  className = "",
}: PropsWithChildren<WithClassName>) {
  return (
    <div className={cn("rounded-32 bg-slate-50 p-24", className)}>
      {children}
    </div>
  );
}
