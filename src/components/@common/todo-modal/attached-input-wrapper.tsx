import React, { useContext, useState } from "react";

import CheckboxOff from "@/assets/icons-small/checkbox/checkbox_off.svg";
import CheckboxOn from "@/assets/icons-small/checkbox/checkbox_on_reverse.svg";
import { cn } from "@/lib/cn";

import Label from "../label";

import FileInput from "./file-input";
import { FormContext } from "./form-context";
import { SelectOptionType } from "./input-type";
import LinkInput from "./link-input";

interface AttachedInputWrapperProps {
  handleToggleInput: (value: SelectOptionType) => void;
}

export default function AttachedInputWrapper({
  handleToggleInput,
}: AttachedInputWrapperProps) {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useContext(FormContext)!;
  const [selectOption, setSelectOption] = useState<SelectOptionType>("file");

  const handleChangeOption = (value: SelectOptionType) => {
    handleToggleInput(value);
    setSelectOption(value);
  };

  return (
    <div className="space-y-12">
      <Label label="자료" />
      <ul className="flex gap-8">
        <li>
          <button
            onClick={() => handleChangeOption("file")}
            className={cn(
              "flex h-40 items-center justify-center gap-3 rounded-8 bg-slate-100 px-12 font-medium text-slate-800",
              selectOption === "file" && "bg-slate-900 text-white",
            )}
            type="button"
          >
            {selectOption === "file" ? <CheckboxOn /> : <CheckboxOff />}
            파일 업로드
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChangeOption("link")}
            className={cn(
              "flex h-40 items-center justify-center gap-3 rounded-8 bg-slate-100 px-12 font-medium text-slate-800",
              selectOption === "link" && "bg-slate-900 text-white",
            )}
            type="button"
          >
            {selectOption === "link" ? <CheckboxOn /> : <CheckboxOff />}
            링크 첨부
          </button>
        </li>
      </ul>
      {selectOption === "file" && (
        <FileInput
          id={selectOption}
          register={register}
          value={watch("file")}
          error={errors.file}
          trigger={trigger}
        />
      )}
      {selectOption === "link" && (
        <>
          <LinkInput id={selectOption} register={register} />
          {errors.link && (
            <p className="mt-8 inline-block text-sm font-normal text-red-500">
              {errors.link.message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
