import Input from "../input";

import { TodoModalSchema, useTodoFormContext } from "./todo-form-provider";

interface LinkInputProps {
  id: keyof TodoModalSchema & "link";
}

export default function LinkInput({ id }: LinkInputProps) {
  const {
    register,
    formState: { errors },
  } = useTodoFormContext();
  return (
    <>
      <Input
        id={id}
        className="w-full md:w-full"
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
