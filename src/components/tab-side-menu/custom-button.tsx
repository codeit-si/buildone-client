import { cva } from "class-variance-authority";

import PlusDarkBlue from "@/assets/plus/plus_db.svg";
import PlusDarkBlueSmall from "@/assets/plus/plus_db_sm.svg";
import PlusWhite from "@/assets/plus/plus_w.svg";
import PlusWhiteSmall from "@/assets/plus/plus_w_sm.svg";
import Button from "@/components/@common/button";
import { cn } from "@/lib/cn";
import { ButtonProps } from "@/types/tab-side-menu";

export default function CustomButton({
  isMobile,
  children,
  onClick,
  variant,
  color,
  className,
}: ButtonProps) {
  const whiteColor = color === "white";
  const Icon = isMobile
    ? whiteColor
      ? PlusWhiteSmall
      : PlusDarkBlueSmall
    : whiteColor
      ? PlusWhite
      : PlusDarkBlue;

  const buttonVariants = cva("font-semibold p-0", {
    variants: {
      isMobile: {
        true: "flex max-h-36 min-h-36 min-w-84 max-w-84 md:hidden",
        false: "hidden w-full md:flex lg:flex",
      },
    },
    defaultVariants: {
      isMobile: false,
    },
  });

  return (
    <Button
      className={cn(buttonVariants({ isMobile }), className)}
      onClick={onClick}
      variant={variant}
    >
      <Icon />
      <p className={`ml-5 h-full ${isMobile && "text-sm"}`}>{children}</p>
    </Button>
  );
}
