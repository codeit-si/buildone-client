import Goals from "@/assets/goals.svg";
import { IsAddingProps } from "@/types/tab-sidemenu";

import CustomButton from "./custom-button";
import Menus from "./menus";

const GoalsMenu = ({ isAdding, setIsAdding }: IsAddingProps) => {
  return (
    <div className="flex items-center border-t">
      <Menus href="#" title="목표" icon={<Goals />} cursor="cursor-default" />
      {!isAdding && (
        <CustomButton
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
