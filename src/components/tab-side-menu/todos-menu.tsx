"use client";

import { useState } from "react";

import DashBoard from "@/assets/icons-small/dashboard.svg";

import TodoModal from "../todo-modal/todo-modal";

import CustomButton from "./custom-button";
import Menus from "./menus";

export default function TodosMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between border-t p-16 px-24 py-16">
        <Menus
          href="/dashboard"
          title="대시보드"
          icon={<DashBoard />}
          cursor="cursor-pointer"
        />
        <CustomButton
          isMobile
          color="white"
          onClick={() => setIsModalOpen(true)}
        >
          새 할 일
        </CustomButton>
      </div>
      {isModalOpen && (
        <TodoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
}
