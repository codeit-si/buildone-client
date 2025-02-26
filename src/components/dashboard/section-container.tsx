import { PropsWithChildren } from "react";

import { cn } from "@/lib/cn";

interface SectionContainerProps {
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: PropsWithChildren<SectionContainerProps>) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-16 rounded-2xl bg-white p-16",
        className,
      )}
    >
      {children}
    </section>
  );
}
