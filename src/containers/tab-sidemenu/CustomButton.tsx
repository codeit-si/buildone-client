import { cva } from "class-variance-authority";

import PlusBlue from "@/assets/plus/plus_b.svg";
import PlusBlueSmall from "@/assets/plus/plus_b_sm.svg";
import PlusWhite from "@/assets/plus/plus_w.svg";
import PlusWhiteSmall from "@/assets/plus/plus_w_sm.svg";
import Button from "@/components/button";
import { ButtonProps } from "@/types/tab-sidemenu";

const CustomButton = ({
  isMobile,
  children,
  onClick,
  variant,
  color,
}: ButtonProps) => {
  const whiteColor = color === "white";
  const Icon = isMobile
    ? whiteColor
      ? PlusWhiteSmall
      : PlusBlueSmall
    : whiteColor
      ? PlusWhite
      : PlusBlue;

  const buttonVariants = cva("font-semibold p-0", {
    variants: {
      isMobile: {
        true: "mr-20 flex max-h-36 min-h-36 min-w-84 max-w-84 md:hidden",
        false: "hidden w-full md:flex lg:flex",
      },
      color: {
        white: "bg-purple-500 text-white",
        blue: "text-purple-500",
      },
    },
    defaultVariants: {
      isMobile: false,
      color: "blue",
    },
  });

  return (
    <Button
      className={buttonVariants({ isMobile, color })}
      onClick={onClick}
      variant={variant}
    >
      <Icon />
      <p className={`ml-5 h-full tracking-[5px] ${isMobile && "text-13"}`}>
        {children}
      </p>
    </Button>
  );
};
export default CustomButton;
