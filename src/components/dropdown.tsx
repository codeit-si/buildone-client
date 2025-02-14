"use client";

import { useEffect, useRef, useState } from "react";

import { cva } from "class-variance-authority";

import KebabIcon from "@/assets/kebab.svg";

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  size?: "sm" | "md";
  items: DropdownItem[];
}

const dropdownVariants = cva(
  "absolute z-50 right-0 h-auto overflow-hidden rounded-17 bg-white shadow-lg",
  {
    variants: {
      size: {
        sm: "w-81",
        md: "w-106",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const itemVariants = cva(
  "flex w-full items-center justify-center font-slate-700 hover:bg-slate-100",
  {
    variants: {
      size: {
        sm: "h-34 px-2 text-sm",
        md: "h-42 px-4 text-lg",
      },
    },
  },
);

function Dropdown({ size = "md", items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev); // 닫고 열고

  // 드롭다운 외부 클릭 시 닫힘
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="메뉴 열기"
        onClick={toggleDropdown}
        className="bg-white flex h-24 w-24 items-center justify-center rounded-full"
      >
        <div className="flex flex-col items-center">
          <KebabIcon />
        </div>
      </button>
      {isOpen && (
        <div
          role="menu"
          aria-label="옵션 선택 드롭다운"
          className={dropdownVariants({ size })}
        >
          {items.map(({ id, label, onClick }) => (
            <button
              key={id}
              onClick={onClick}
              role="menuitem"
              className={itemVariants({ size })}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
