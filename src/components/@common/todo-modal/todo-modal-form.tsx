import React, { Dispatch, SetStateAction } from "react";

import CheckboxOff from "@/assets/icons-small/checkbox/checkbox_off.svg";
import CheckboxOn from "@/assets/icons-small/checkbox/checkbox_on.svg";
import { cn } from "@/lib/cn";
import {
  getPresignedUrl,
  putFileToPresignedUrl,
} from "@/services/file/upload-file-to-presigned-url";
import { postTodo, putTodo } from "@/services/todos";
import { GoalResponse, TodoResponse } from "@/types/dashboard";

import Button from "../button";
import Input from "../input";

import AttachedInputWrapper from "./attached-input-wrapper";
import GoalDropdown from "./goal-dropdown";
import {
  SelectOptionType,
  TodoModalSchema,
  useTodoFormContext,
} from "./todo-form-provider";

interface TodoModalProps {
  goalId?: GoalResponse["id"];
  todo?: TodoResponse;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function TodoModalForm({
  goalId,
  todo,
  onOpenChange,
}: TodoModalProps) {
  const formContextValue = useTodoFormContext();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
    setValue,
  } = formContextValue;

  const isDone = watch("isDone");

  const handleToggleInput = (value: SelectOptionType) => {
    setValue(value === "file" ? "link" : "file", undefined);
  };

  const onSubmit = async (data: TodoModalSchema) => {
    let fileUrl;
    if (data.file && data.file[0]) {
      const file = data.file[0];
      const fileName = file.name;
      const presignedUrl = await getPresignedUrl({
        prefix: "todo",
        fileName,
      });
      fileUrl = await putFileToPresignedUrl({ presignedUrl, file });
    }
    const { title, link, isDone: done } = data;
    if (todo && done) {
      const newTodo = putTodo(todo?.id, {
        goalId,
        title,
        fileUrl,
        linkUrl: link,
        isDone: done,
      });
      // eslint-disable-next-line no-console
      console.log(newTodo);
    } else {
      const newTodo = postTodo({
        goalId,
        title,
        fileUrl,
        linkUrl: link,
      });
      // eslint-disable-next-line no-console
      console.log(newTodo);
    }
    onOpenChange(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col justify-between gap-24"
    >
      <div className="flex flex-col gap-24">
        {todo && (
          <button
            className="flex h-40 w-100 items-center justify-center gap-6 rounded-xl px-12 hover:bg-slate-100"
            onClick={() => setValue("isDone", !isDone)}
            type="button"
          >
            {isDone ? <CheckboxOn /> : <CheckboxOff />}
            Done
          </button>
        )}
        <div>
          <Input
            id="create-todo-title"
            type="text"
            label="제목"
            placeholder="할일 제목을 적어주세요."
            {...register("title")}
            className={cn(
              "w-full md:w-full",
              errors.title &&
                "border-red-500 focus-within:border-red-500 hover:border-red-500",
            )}
          />
          {errors.title && (
            <p className="mt-8 inline-block text-sm font-normal text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <AttachedInputWrapper handleToggleInput={handleToggleInput} />
        <GoalDropdown goalId={goalId} />
      </div>
      <Button
        className="w-full"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
      >
        확인
      </Button>
    </form>
  );
}
