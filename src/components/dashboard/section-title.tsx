import { PropsWithChildren } from "react";

export default function SectionTitle({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-8 text-base font-semibold">
      {children}
    </div>
  );
}
