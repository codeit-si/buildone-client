import Link from "next/link";

import { LinkProps } from "@/types/tab-side-menu";

export default function Menus({ href, icon, title, cursor }: LinkProps) {
  return (
    <Link
      className={`${cursor} flex w-full items-center gap-10 text-lg font-medium text-slate-800`}
      href={href}
    >
      {icon}
      <h3>{title}</h3>
    </Link>
  );
}
