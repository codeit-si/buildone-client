"use client";

import EllipseEmptyIcon from "@/assets/icons-small/ellipse_empty.svg";
import { cn } from "@/lib/cn";

interface MyProgressToggleProps {
  toggle: boolean;
  setToggle: () => void;
}

const viewTransition =
  typeof document !== "undefined" && document.startViewTransition
    ? (cb: () => void) => document.startViewTransition(cb)
    : (cb: () => void) => cb();

export default function MyProgressToggle({
  toggle,
  setToggle,
}: MyProgressToggleProps) {
  return (
    <button
      className={cn(
        "absolute right-15 top-15 flex h-36 w-80 items-center justify-between rounded-full bg-black px-6",
      )}
      style={{
        justifyContent: toggle ? "flex-start" : "flex-end",
        viewTransitionName: "container",
      }}
      onClick={() => viewTransition(() => setToggle())}
      type="button"
    >
      <div className="absolute left-10">
        <EllipseEmptyIcon />
      </div>
      <div
        className={cn(
          "absolute right-10 grid h-20 w-20 grid-cols-2 gap-2 transition-opacity duration-200",
          !toggle && "opacity-0",
        )}
      >
        <div className="rounded-[0.87px] border border-white" />
        <div className="rounded-[0.87px] border border-white" />
        <div className="rounded-[0.87px] border border-white" />
        <div className="rounded-[0.87px] border border-white" />
      </div>
      <div
        className="z-10 h-24 w-24 rounded-full bg-white"
        style={{ viewTransitionName: "toggle" }}
      />
    </button>
  );
}
