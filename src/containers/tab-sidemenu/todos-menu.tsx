import DashBoard from "@/assets/dashboard.svg";

import CustomButton from "./custom-button";
import Menus from "./menus";

const TodosMenu = () => {
  return (
    <div className="flex items-center justify-between border-t">
      <Menus
        href="/home"
        title="대시보드"
        icon={<DashBoard />}
        cursor="cursor-pointer"
      />
      <CustomButton isMobile color="white">
        새할일
      </CustomButton>
    </div>
  );
};
export default TodosMenu;
