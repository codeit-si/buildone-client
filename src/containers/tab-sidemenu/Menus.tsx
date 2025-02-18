import Link from "next/link";

import { LinkProps } from "@/types/tab-sidemenu";

const Menus = ({ href, icon, title, cursur }: LinkProps) => {
  return (
    <Link
      className={`${cursur} flex w-full items-center gap-10 px-20 py-15 font-bold text-slate-800`}
      href={href}
    >
      {icon}
      <h3>{title}</h3>
    </Link>
  );
};
export default Menus;
