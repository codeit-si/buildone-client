import { useMemo } from "react";

import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";

import Sandwich from "@/assets/icons-small/sandwich.svg";
import TabOff from "@/assets/icons-small/tab_off.svg";
import TabOn from "@/assets/icons-small/tab_on.svg";
import Button from "@/components/@common/button";
import { IsTabMinimizedProps } from "@/types/tab-side-menu";

const mobileStatusTitleStyle = cva(
  "text-16 font-semibold ml-16 leading-6 text-slate-800 md:hidden",
  {
    variants: {
      open: {
        true: "hidden",
        false: "",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

const tabToggleButtonStyle =
  "min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0";

export default function TabToggle({
  isTabMinimized,
  setIsTabMinimized,
}: IsTabMinimizedProps) {
  const pathname = usePathname();
  const title = useMemo(() => {
    if (pathname.includes("/goals") && pathname.includes("/notes")) return "";
    if (pathname.includes("/dashboard")) return "대시보드";
    if (pathname.includes("/todos")) return "";
    if (pathname.includes("/goals")) return "목표";
    if (pathname.includes("/notes")) return "";
  }, [pathname]);
  return (
    <div
      className={`item-center flex ${!isTabMinimized ? "w-full justify-end" : ""}`}
    >
      <Button
        onClick={() => setIsTabMinimized(!isTabMinimized)}
        className={tabToggleButtonStyle}
      >
        {!isTabMinimized ? (
          <div className="rotate-90 md:rotate-0">
            <TabOff />
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <TabOn />
            </div>
            <div className="block md:hidden">
              <Sandwich />
            </div>
          </>
        )}
      </Button>
      <h2 className={mobileStatusTitleStyle({ open: !isTabMinimized })}>
        {title}
      </h2>
    </div>
  );
}
