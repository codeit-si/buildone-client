import { PropsWithChildren } from "react";

import useInView from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

interface ScrollListGradientProviderProps {
  scrollListStyle?: string;
  gradientStyle?: string;
}

export default function ScrollListGradientProvider({
  scrollListStyle,
  gradientStyle,
  children,
}: PropsWithChildren<ScrollListGradientProviderProps>) {
  const [topRef, isTopInView] = useInView();
  const [bottomRef, isBottomInView] = useInView();

  return (
    <div className="relative">
      <div
        className={cn(
          "scrollbar mt-16 max-h-152 overflow-y-scroll",
          scrollListStyle,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-10 h-50 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300",
            !isTopInView ? "opacity-100" : "opacity-0",
            gradientStyle,
          )}
        />
        <div ref={topRef} className="h-1 w-full" />
        {children}
        <div ref={bottomRef} className="h-1 w-full" />
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-50 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300",
            !isBottomInView ? "opacity-100" : "opacity-0",
            gradientStyle,
          )}
        />
      </div>
    </div>
  );
}
