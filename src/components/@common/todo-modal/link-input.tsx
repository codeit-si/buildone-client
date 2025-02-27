import { FieldValues, Path, useForm } from "react-hook-form";

import Input from "../input";

interface LinkInputProps<T extends FieldValues> {
  id: Path<T>;
  register: ReturnType<typeof useForm<T>>["register"];
}

export default function LinkInput<T extends FieldValues>({
  id,
  register,
}: LinkInputProps<T>) {
  return (
    <Input
      id={id}
      className="w-full md:w-full"
      placeholder="링크를 적어주세요."
      {...register(id)}
    />
  );
}
