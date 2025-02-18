import { cva } from "class-variance-authority";

import Sandwich from "@/assets/sandwich.svg";
import TabOff from "@/assets/tab_off.svg";
import TabOn from "@/assets/tab_on.svg";
import Button from "@/components/button";
import { IsTabOpenProps } from "@/types/tab-sidemenu";

const mobileStatusTitleStyle = cva(
  "ml-5 text-14 font-bold leading-6 text-slate-800 md:hidden",
);
const tabToggleButtonStyle = cva(
  "ml-20 min-h-0 min-w-0 bg-opacity-0 p-0 hover:bg-opacity-0 active:bg-opacity-0 md:m-0",
);
const tabToggleWrapStyle = cva("item-center flex", {
  variants: {
    open: {
      true: "hidden md:flex",
      false: "",
    },
  },
  defaultVariants: {
    open: false,
  },
});
const TabToggleComponent = ({ isTabOpen, setIsTabOpen }: IsTabOpenProps) => {
  return (
    <div className={tabToggleWrapStyle({ open: !isTabOpen })}>
      <Button
        onClick={() => setIsTabOpen(!isTabOpen)}
        className={tabToggleButtonStyle()}
      >
        {!isTabOpen ? (
          <TabOff />
        ) : (
          <>
            <div className="hidden md:block lg:block">
              <TabOn />
            </div>
            <div className="block md:hidden lg:hidden">
              <Sandwich />
            </div>
          </>
        )}
      </Button>
      <h2 className={mobileStatusTitleStyle()}>대시보드</h2>
    </div>
  );
};
export default TabToggleComponent;
