import { PropsWithChildren } from "react";

import { cn } from "@/lib/cn";
import { WithClassName } from "@/types/dashboard";

export default function GoalTitle({
  children,
  className = "",
}: PropsWithChildren<WithClassName>) {
  return <h3 className={cn("text-lg font-bold", className)}>{children}</h3>;
}
