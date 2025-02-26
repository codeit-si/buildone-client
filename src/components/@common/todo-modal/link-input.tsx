import { FieldValues, Path, useForm } from "react-hook-form";

import { cn } from "@/lib/cn";

import { BASE_CLASS } from "../input";

interface LinkInputProps<T extends FieldValues> {
  id: Path<T>;
  register: ReturnType<typeof useForm<T>>["register"];
}

export default function LinkInput<T extends FieldValues>({
  id,
  register,
}: LinkInputProps<T>) {
  return (
    <input
      id={id}
      className={cn(BASE_CLASS, "w-full")}
      placeholder="링크를 적어주세요."
      {...register(id)}
    />
  );
}
