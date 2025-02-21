import Link from "next/link";

import { LinkProps } from "@/types/tab-side-menu";

export default function Menus({ href, icon, title, cursor }: LinkProps) {
  return (
    <Link
      className={`${cursor} flex w-full items-center gap-10 p-16 text-lg font-medium text-slate-800 md:px-24 md:py-16`}
      href={href}
    >
      {icon}
      <h3>{title}</h3>
    </Link>
  );
}
