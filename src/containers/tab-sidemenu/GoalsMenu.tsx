import Goals from "@/assets/goals.svg";
import { mobileButtonStyle } from "@/styles/tab-sidemenu";
import { IsAddingProps } from "@/types/tab-sidemenu";

import CustomButton from "./CustomButton";
import Menus from "./Menus";

const GoalsMenu = ({ isAdding, setIsAdding }: IsAddingProps) => {
  return (
    <div className="flex items-center border-t">
      <Menus href="/#" title="목표" icon={<Goals />} cursor="cursor-default" />
      {!isAdding && (
        <CustomButton
          className={mobileButtonStyle}
          isMobile
          onClick={() => setIsAdding(!isAdding)}
          variant="outlined"
          color="blue"
        >
          새목표
        </CustomButton>
      )}
    </div>
  );
};
export default GoalsMenu;
