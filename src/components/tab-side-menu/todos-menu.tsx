import DashBoard from "@/assets/dashboard.svg";

import CustomButton from "./custom-button";
import Menus from "./menus";

export default function TodosMenu() {
  return (
    <div className="flex items-center justify-between border-t">
      <Menus
        href="/dashboard"
        title="대시보드"
        icon={<DashBoard />}
        cursor="cursor-pointer"
      />
      <CustomButton isMobile color="white">
        새 할 일
      </CustomButton>
    </div>
  );
}
