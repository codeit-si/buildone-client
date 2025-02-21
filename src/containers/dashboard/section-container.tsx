import { PropsWithChildren } from "react";

export default function SectionContainer({ children }: PropsWithChildren) {
  return (
    <section className="flex h-258 w-full flex-col gap-16 rounded-2xl bg-white p-16 md:h-250">
      {children}
    </section>
  );
}
