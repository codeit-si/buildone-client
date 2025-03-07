import Goals from "@/assets/icons-small/goals.svg";
import { IsAddingProps } from "@/types/tab-side-menu";

import CustomButton from "./custom-button";
import Menus from "./menus";

export default function GoalsMenu({ isAdding, setIsAdding }: IsAddingProps) {
  return (
    <div className="flex items-center border-t px-24 py-16">
      <Menus href="#" title="목표" icon={<Goals />} cursor="cursor-default" />
      <CustomButton
        isMobile
        onClick={() => setIsAdding(!isAdding)}
        variant="outlined"
        color="blue"
      >
        새 목표
      </CustomButton>
    </div>
  );
}
