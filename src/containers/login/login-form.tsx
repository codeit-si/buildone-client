"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/components/button";
import Input from "@/components/input";
import LabeledField from "@/components/labeled-field";
import { useDebounce } from "@/hooks/useDebounce";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요")
    .email("이메일 형식을 입력해주세요"),
  password: z.string().nonempty("비밀번호를 입력해주세요"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");

  const debouncedEmail = useDebounce(email, 1000);

  useEffect(() => {
    if (debouncedEmail) {
      trigger("email");
    }
  }, [debouncedEmail, trigger]);

  const onSubmit = async (data: LoginSchema) => {
    // TODO - submit 했을 때 이메일 틀렸거나, 비밀번호가 틀렸을 때 setError로 에러 메시지 설정
    // https://react-hook-form.com/docs/useform/seterror

    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabeledField htmlFor="email" label="아이디">
        <Input
          id="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          className={
            errors.email &&
            "border-red-500 focus-within:border-red-500 hover:border-red-500"
          }
        />
      </LabeledField>
      {errors.email && (
        <p className="mt-8 inline-block text-sm font-normal text-red-500">
          {errors.email.message}
        </p>
      )}
      <LabeledField label="비밀번호" htmlFor="password" className="mt-24">
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
          className={
            errors.password &&
            "border-red-500 focus-within:border-red-500 hover:border-red-500"
          }
        />
      </LabeledField>
      {errors.password && (
        <p className="mt-8 inline-block text-sm font-normal text-red-500">
          {errors.password.message}
        </p>
      )}
      <Button
        type="submit"
        className="mt-48 w-full"
        disabled={!isDirty || !isValid}
      >
        로그인
      </Button>
    </form>
  );
}
