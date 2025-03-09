import { cva } from "class-variance-authority";
import Link from "next/link";

import CompactLogo from "@/assets/logo/compact_logo.svg";
import MainLogo from "@/assets/logo/main_logo_small.svg";
import { IsTabMinimizedProps } from "@/types/tab-side-menu";

const MainLogoStyle = cva("transition-all absolute duration-300 top-0", {
  variants: {
    open: {
      true: "translate-x-0 opacity-100",
      false: "-translate-x-full opacity-0",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const CompactLogoStyle = cva(
  "hidden md:block transition-all left-[50%] absolute duration-500 top-0",
  {
    variants: {
      open: {
        true: "-translate-x-[50%] opacity-100",
        false: "-translate-x-500 opacity-0",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

export default function Logo({ isTabMinimized }: IsTabMinimizedProps) {
  return (
    <Link
      className={`md:w-full ${isTabMinimized && "md:h-32"}`}
      href="/dashboard"
    >
      <div className={CompactLogoStyle({ open: isTabMinimized })}>
        <CompactLogo aria-label="빌드원 로고" />
      </div>
      <div className={MainLogoStyle({ open: !isTabMinimized })}>
        <MainLogo aria-label="빌드원 로고" />
      </div>
    </Link>
  );
}
