import { cva } from "class-variance-authority";
import Link from "next/link";

import CompactLogo from "@/assets/logo/compact_logo.svg";
import MainLogo from "@/assets/logo/main_logo_small.svg";
import { IsTabMinimizedProps } from "@/types/tab-side-menu";

const logoWrapStyle = cva("", {
  variants: {
    open: {
      true: "hidden md:block lg:block",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});

export default function Logo({ isTabMinimized }: IsTabMinimizedProps) {
  return (
    <div className={logoWrapStyle({ open: isTabMinimized })}>
      <Link href="/dashboard">
        {isTabMinimized ? <CompactLogo /> : <MainLogo />}
      </Link>
    </div>
  );
}
