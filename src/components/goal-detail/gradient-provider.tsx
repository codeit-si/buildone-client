import { PropsWithChildren } from "react";

import { cn } from "@/lib/cn";

interface GradientProviderProps {
  topInView: boolean;
  bottomInView: boolean;
  className?: string;
}

export default function GradientProvider({
  topInView,
  bottomInView,
  className,
  children,
}: PropsWithChildren<GradientProviderProps>) {
  return (
    <div className="relative">
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-10 h-50 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300",
          !topInView ? "opacity-100" : "opacity-0",
          className,
        )}
      />
      {children}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-50 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300",
          !bottomInView ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}
