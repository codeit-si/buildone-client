import PlusBlue from "@/assets/plus/plus_b.svg";
import PlusBlueSmall from "@/assets/plus/plus_b_sm.svg";
import PlusWhite from "@/assets/plus/plus_w.svg";
import PlusWhiteSmall from "@/assets/plus/plus_w_sm.svg";
import Button from "@/components/button";
import { ButtonProps } from "@/types/tab-sidemenu";

const CustomButton = ({
  isMobile,
  className,
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

  return (
    <Button className={className()} onClick={onClick} variant={variant}>
      <Icon />
      <p className={`ml-5 h-full tracking-[5px] ${isMobile ? "text-13" : ""}`}>
        {children}
      </p>
    </Button>
  );
};
export default CustomButton;
