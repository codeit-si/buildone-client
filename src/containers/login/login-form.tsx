"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import Button from "@/components/button";
import Input from "@/components/input";
import LabeledField from "@/components/labeled-field";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiError } from "@/lib/error";
import { login } from "@/services/auth";
import { useAuthActions } from "@/store/auth-store";
import { useUserActions } from "@/store/user-store";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("이메일 형식을 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
});

type LoginSchema = z.infer<typeof loginSchema>;
type LoginSchemaKey = keyof LoginSchema;

export default function LoginForm() {
  const router = useRouter();

  const { setAccessToken, setExpiredTime } = useAuthActions();
  const { setUserInfo } = useUserActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
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
    try {
      const response = await login(data.email, data.password);

      const token = response.headers?.["access-token"];
      const expiredTime = response.headers?.["access-token-expired-time"];

      setAccessToken(token);
      setExpiredTime(expiredTime);
      setUserInfo(response.data.memberInformation);

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        if (error.code === "NOT_FOUND_EXIST_MEMBER") {
          setError("email", { type: "valid", message: error.message });
        }

        if (error.code === "INVALID_PASSWORD_FORMAT") {
          setError("password", { type: "valid", message: error.message });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[
        {
          key: "email",
          label: "아이디",
          type: "text",
          placeholder: "이메일을 입력해주세요.",
        },
        {
          key: "password",
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      ].map(({ key, label, type, placeholder }, index) => (
        <LabeledField
          key={key}
          htmlFor={key}
          label={label}
          className={index > 0 ? "mt-24" : ""}
        >
          <Input
            id={key}
            type={type}
            placeholder={placeholder}
            {...register(key as LoginSchemaKey)}
            className={
              errors[key as LoginSchemaKey] &&
              "border-red-500 focus-within:border-red-500 hover:border-red-500"
            }
          />
          {errors[key as LoginSchemaKey] && (
            <p className="mt-8 inline-block text-sm font-normal text-red-500">
              {errors[key as LoginSchemaKey]?.message}
            </p>
          )}
        </LabeledField>
      ))}
      <Button
        type="submit"
        className="mt-48 w-full"
        disabled={!isDirty || !isValid}
      >
        로그인하기
      </Button>
    </form>
  );
}
