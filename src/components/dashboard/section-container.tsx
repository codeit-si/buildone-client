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
        "mb-12 flex w-full flex-col gap-16 rounded-12 bg-white p-16 md:m-0",
        className,
      )}
    >
      {children}
    </section>
  );
}
