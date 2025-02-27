import DashBoard from "@/assets/icons-small/dashboard.svg";
import { useUserStore } from "@/store/user-store";

import CustomButton from "./custom-button";
import Menus from "./menus";

export default function TodosMenu() {
  const { id } = useUserStore();
  return (
    <div className="flex items-center justify-between border-t p-16 px-24 py-16">
      <Menus
        href={id ? "/dashboard" : "/login"}
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
