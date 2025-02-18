import { cva } from "class-variance-authority";
import Link from "next/link";

import Logo1 from "@/assets/logo_1.svg";
import Logo2 from "@/assets/logo_2.svg";
import Button from "@/components/button";
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
const logoStyle = cva(
  "min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0 md:hidden",
);

const LogoComponent = ({ isTabOpen, setIsTabOpen }: IsTabOpenProps) => {
  return (
    <div className={logoWrapStyle({ open: isTabOpen })}>
      <Link className="hidden md:block" href="/home">
        {!isTabOpen ? <Logo1 /> : <Logo2 />}
      </Link>
      <Button onClick={() => setIsTabOpen(!isTabOpen)} className={logoStyle()}>
        <Logo1 />
      </Button>
    </div>
  );
};
export default LogoComponent;
