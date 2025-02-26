import { FieldValues, Path, useForm } from "react-hook-form";

import PlusGrayIcon from "@/assets/icons-small/plus/plus_g.svg";
import UploadedIcon from "@/assets/icons-small/uploaded.svg";
import { cn } from "@/lib/cn";

import { BASE_CLASS } from "../input";

interface FileInputProps<T extends FieldValues> {
  id: Path<T>;
  register: ReturnType<typeof useForm<T>>["register"];
  value: FileList | null | undefined;
  error?: ReturnType<typeof useForm<T>>["formState"]["errors"];
}

export default function FileInput<T extends FieldValues>({
  id,
  register,
  value,
  error,
}: FileInputProps<T>) {
  const isUploadedFile = value && value[0] && value[0].name;

  return (
    <label
      htmlFor={id}
      className={cn(
        BASE_CLASS,
        "h-184 w-full cursor-pointer flex-col justify-center gap-8 text-base text-slate-400",
      )}
    >
      {isUploadedFile ? <UploadedIcon /> : <PlusGrayIcon />}
      {isUploadedFile ? value[0].name : "파일을 업로드해주세요"}
      <input id={id} className="hidden" type="file" {...register(id)} />
      {error && (
        <p className="mt-8 inline-block text-sm font-normal text-red-500">
          {error.type?.message?.toString() ?? error.message?.toString()}
        </p>
      )}
    </label>
  );
}
