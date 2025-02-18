"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import KebabIcon from "@/assets/kebab.svg";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
}

function Dropdown({ items }: DropdownProps) {
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
        className="flex h-24 w-24 items-center justify-center rounded-full bg-white"
      >
        <div className="flex flex-col items-center">
          <KebabIcon />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            role="menu"
            aria-label="옵션 선택 드롭다운"
            className="absolute right-0 z-50 h-auto w-81 overflow-hidden rounded-17 bg-white shadow-md md:w-106"
          >
            {items.map(({ label, onClick }, i) => (
              <button
                key={`kebab-dropdown-${i + 1}`}
                onClick={onClick}
                role="menuitem"
                className="font-slate-700 flex h-34 w-full items-center justify-center px-2 text-sm hover:bg-slate-100 md:h-42 md:px-4 md:text-lg"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
