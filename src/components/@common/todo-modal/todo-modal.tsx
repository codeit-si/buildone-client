"use client";

import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import CheckboxOff from "@/assets/icons-small/checkbox/checkbox_off.svg";
import CheckboxOn from "@/assets/icons-small/checkbox/checkbox_on.svg";
import CheckboxReverseOn from "@/assets/icons-small/checkbox/checkbox_on_reverse.svg";
import { cn } from "@/lib/cn";
import {
  getPresignedUrl,
  putFileToPresignedUrl,
} from "@/services/file/upload-file-to-presigned-url";
import { postTodo, putTodo } from "@/services/todos";
import { GoalResponse, TodoResponse } from "@/types/dashboard";

import Button from "../button";
import Input from "../input";
import Modal from "../portal/modal";

import FileInput from "./file-input";
import GoalDropdown from "./goal-dropdown";
import LinkInput from "./link-input";

interface CreateTodoModalProps {
  goalId?: GoalResponse["id"];
  todo?: TodoResponse;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

type SelectOptionType = "file" | "link";

const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

const createTodoModalSchema = z
  .object({
    title: z
      .string()
      .min(1, "제목을 입력해주세요")
      .max(30, "30자 이내로 입력해주세요"),
    file: z.custom<FileList | null | undefined>().optional(),
    link: z.string().url("올바른 URL을 입력해주세요").optional(),
    isDone: z.boolean().optional(),
  })
  .superRefine(({ file }, ctx) => {
    if (!file || !file.length) return;
    if (file[0]?.size && file[0]?.size > FILE_SIZE_LIMIT)
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "파일 크기는 10MB를 초과할 수 없습니다.",
        path: ["file"],
      });
    if (!ACCEPTED_FILE_TYPES.includes(file[0]?.type || ""))
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "지원하지 않는 파일 형식입니다.",
        path: ["file"],
      });
  });

type CreateTodoModalSchema = z.infer<typeof createTodoModalSchema>;

export default function TodoModal({
  children,
  goalId,
  todo,
  open,
  onOpenChange = () => {},
}: PropsWithChildren<CreateTodoModalProps>) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<CreateTodoModalSchema>({
    resolver: zodResolver(createTodoModalSchema),
    mode: "onBlur",
    defaultValues: {
      title: todo?.title || "",
      isDone: !!todo?.isDone,
    },
  });
  const [selectOption, setSelectOption] = useState<SelectOptionType>("file");
  const isDone = watch("isDone");

  const handleChangeOption = (value: SelectOptionType) => {
    setValue(value === "file" ? "link" : "file", undefined);
    setSelectOption(value);
  };

  const onSubmit = async (data: CreateTodoModalSchema) => {
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
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      {/* 모달 상단의 X버튼을 누르면 팝업이 나오는데 이 부분은 따로 구현하겠습니다. (지금은은 바로 닫힙니다.) */}
      <Modal.Content className="h-full">
        <Modal.Title>할일 생성</Modal.Title>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-24">
          {todo && (
            <button
              className="flex items-center justify-between gap-6"
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
          <div className="space-y-12">
            <h4 className="text-lg font-semibold">자료</h4>
            <ul className="flex gap-8">
              <li>
                <button
                  onClick={() => handleChangeOption("file")}
                  className={cn(
                    "flex h-40 items-center justify-center gap-3 rounded-8 bg-slate-100 px-12 font-medium text-slate-800",
                    selectOption === "file" && "bg-slate-900 text-white",
                  )}
                >
                  {selectOption === "file" ? (
                    <CheckboxReverseOn />
                  ) : (
                    <CheckboxOff />
                  )}
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
                >
                  {selectOption === "link" ? (
                    <CheckboxReverseOn />
                  ) : (
                    <CheckboxOff />
                  )}
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
          <GoalDropdown goalId={goalId} />
        </form>
        <Modal.Footer>
          <Button
            className="w-full"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
