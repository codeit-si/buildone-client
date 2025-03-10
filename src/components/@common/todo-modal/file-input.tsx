import PlusGrayIcon from "@/assets/icons-small/plus/plus_g.svg";
import UploadedIcon from "@/assets/icons-small/uploaded.svg";
import { cn } from "@/lib/cn";

import { BASE_CLASS } from "../input";

import { TodoModalSchema, useTodoFormContext } from "./todo-form-provider";

interface FileInputProps {
  id: keyof TodoModalSchema & "file";
  selectOption: string;
}

export default function FileInput({ id, selectOption }: FileInputProps) {
  const formContextValue = useTodoFormContext();
  const {
    register,
    watch,
    trigger,
    formState: { errors },
    fileName,
  } = formContextValue;
  const value = watch(id);
  const error = errors[id];
  const isUploadedFile = value && value[0] && value[0].name;

  return (
    <label
      htmlFor={id}
      className={cn(
        BASE_CLASS,
        "h-184 w-full cursor-pointer flex-col justify-center gap-8 text-base text-slate-400",
        id !== selectOption && "hidden",
      )}
    >
      {isUploadedFile || fileName ? <UploadedIcon /> : <PlusGrayIcon />}
      {isUploadedFile ? value[0].name : fileName || "파일을 업로드해주세요"}
      <input
        id={id}
        className="hidden"
        type="file"
        {...register(id, {
          onChange: () => {
            trigger(id);
          },
        })}
      />
      {error && (
        <p className="mt-8 inline-block text-sm font-normal text-red-500">
          {error.message}
        </p>
      )}
    </label>
  );
}
