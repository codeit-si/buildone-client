import { cva } from "class-variance-authority";
import Link from "next/link";

import Logo1 from "@/assets/logo_1.svg";
import Logo2 from "@/assets/logo_2.svg";
import { IsTabOpenProps } from "@/types/tab-sidemenu";

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

const LogoComponent = ({ isTabOpen }: IsTabOpenProps) => {
  return (
    <div className={logoWrapStyle({ open: isTabOpen })}>
      <Link href="/home">{!isTabOpen ? <Logo1 /> : <Logo2 />}</Link>
    </div>
  );
};
export default LogoComponent;
