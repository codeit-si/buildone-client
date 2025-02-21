"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import KebabIcon from "@/assets/kebab.svg";
import DropdownItem from "@/components/@common/dropdown-item";

interface DropdownItemType {
  label: string;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
}
interface DropdownProps {
  items: DropdownItemType[];
}

function Dropdown({ items }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const kebabRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeDropdown();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    };
    if (isDropdownOpen) {
      window.addEventListener("scroll", handleScroll, {
        capture: true,
      });
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDropdownOpen, closeDropdown]);

  useEffect(() => {
    if (isDropdownOpen && kebabRef.current) {
      const buttonRect = kebabRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.y + buttonRect.height,
        left: buttonRect.x + 24 - 81,
      });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, closeDropdown]);

  return (
    <div tabIndex={-1} role="menu" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        aria-label="메뉴 열기"
        onClick={toggleDropdown}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-white"
      >
        <div ref={kebabRef} className="flex flex-col items-center">
          <KebabIcon />
        </div>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            role="menu"
            aria-label="옵션 선택 드롭다운"
            className="fixed z-50 h-auto w-81 overflow-hidden rounded-17 bg-white shadow-md"
            style={{ top: position.top, left: position.left }}
          >
            {items.map(({ label, onClick }, i) => (
              <DropdownItem
                key={`kebab-dropdown-${label}`}
                label={label}
                onClick={(e) => {
                  onClick(e);
                  closeDropdown();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onClick(e);
                    closeDropdown();
                  }
                }}
                isFocus={focusIndex === i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
