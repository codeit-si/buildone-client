import { cn } from "@/lib/cn";

import Input from "../@common/input";

import { TodoModalSchema, useTodoFormContext } from "./todo-form-provider";

interface LinkInputProps {
  id: keyof TodoModalSchema & "link";
  selectOption: string;
}

export default function LinkInput({ id, selectOption }: LinkInputProps) {
  const {
    register,
    formState: { errors },
  } = useTodoFormContext();

  return (
    <>
      <Input
        id={id}
        className={cn("w-full md:w-full", id !== selectOption && "hidden")}
        placeholder="링크를 적어주세요."
        {...register(id)}
      />
      {errors.link && (
        <p className="mt-8 inline-block text-sm font-normal text-red-500">
          {errors.link.message}
        </p>
      )}
    </>
  );
}
