"use client";

import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

import DeleteIcon from "@/assets/icons-small/delete_slate_400.svg";

type Tag = {
  id: string;
  text: string;
};

export default function TagInput(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const tagIdCounter = useRef(0);

  const getNextTagId = (): number => {
    const nextId = tagIdCounter.current + 1;
    tagIdCounter.current = nextId;
    return nextId;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag: Tag = {
        id: `tag-${getNextTagId()}`,
        text: inputValue.trim(),
      };
      setTags((prev) => [...prev, newTag]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  return (
    <div className="container-width flex h-32">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="mr-4 inline-flex w-fit items-center whitespace-nowrap rounded-100 border border-dark-blue-300 bg-dark-blue-100 px-8 py-2"
        >
          <span className="text-sm font-normal">{tag.text}</span>
          <button
            className="ml-4 flex h-16 w-16 items-center justify-center"
            type="button"
            onClick={() => handleRemoveTag(tag.id)}
          >
            <DeleteIcon aria-label="태그 삭제" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력하세요."
        aria-label="태그 입력"
        className="container-width h-32 flex-grow text-base font-normal text-slate-700 outline-none"
      />
    </div>
  );
}
