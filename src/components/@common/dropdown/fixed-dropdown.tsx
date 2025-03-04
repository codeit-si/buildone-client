"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import KebabIcon from "@/assets/icons-small/kebab.svg";
import NoteWriteIcon from "@/assets/icons-small/note_write.svg";
import DropdownItem from "@/components/@common/dropdown/dropdown-item";
import Link from "next/link";

interface DropdownItemType {
  label: string;
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
}
interface DropdownProps {
  items: DropdownItemType[];
  todoId: number;
  todoNoteId: number | null;
}

export default function FixedDropdown({
  items,
  todoId,
  todoNoteId,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const kebabRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = useCallback(() => setIsOpen(false), []);

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
      if (isOpen) {
        closeDropdown();
      }
    };
    if (isOpen) {
      window.addEventListener("scroll", handleScroll, {
        capture: true,
      });
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen, closeDropdown]);

  useEffect(() => {
    if (isOpen && kebabRef.current) {
      const buttonRect = kebabRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.y + buttonRect.height,
        left: buttonRect.x + 24 - 81,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeDropdown]);

  return (
    <div
      className="group-focus-within:pr-5 group-hover:pr-5"
      tabIndex={-1}
      role="menu"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <div className="flex gap-5">
        {todoNoteId === null && (
          <Link
            className="hidden group-focus-within:flex group-hover:flex h-24 w-24 items-center"
            href={`/todos/${todoId}/note/create`}
          >
            <NoteWriteIcon />
          </Link>
        )}
        <button
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="메뉴 열기"
          onClick={toggleDropdown}
          className="hidden items-center justify-center rounded-full bg-white group-focus-within:flex group-hover:flex"
        >
          <div ref={kebabRef} className="flex h-24 w-24 flex-col items-center">
            <KebabIcon />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
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
