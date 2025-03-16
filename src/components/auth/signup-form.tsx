"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { SIGNUP_ERROR_CODE } from "@/constants/error";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiError } from "@/lib/error";
import { signup } from "@/services/auth";
import { registerToken } from "@/services/push-alert";
import { useUserStore } from "@/store/user-store";

import Button from "../@common/button";
import LabeledInput from "../@common/input/labeled-input";

const signupSchema = z
  .object({
    name: z.string().nonempty("이름을 입력해주세요."),
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("이메일 형식을 입력해주세요."),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자가 모두 포함되도록 해주세요.",
      ),
    passwordCheck: z.string().nonempty("비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type SignupSchema = z.infer<typeof signupSchema>;
type SignupSchemaKey = keyof SignupSchema;

export default function SignUpForm() {
  const router = useRouter();
  const fcmToken = useUserStore((state) => state.fcmToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
    trigger,
    watch,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  const debouncedName = useDebounce(name, 1000);
  const debouncedEmail = useDebounce(email, 1000);
  const debouncedPassword = useDebounce(password, 1000);
  const debouncedPasswordCheck = useDebounce(passwordCheck, 1000);

  useEffect(() => {
    const fields = {
      name: debouncedName,
      email: debouncedEmail,
      password: debouncedPassword,
      passwordCheck: debouncedPasswordCheck,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        trigger(key as SignupSchemaKey);
      }
    });
  }, [
    debouncedName,
    debouncedEmail,
    debouncedPassword,
    debouncedPasswordCheck,
    trigger,
  ]);

  const onSubmit = async (data: SignupSchema) => {
    try {
      await signup(data.name, data.email, data.password);

      if (fcmToken) {
        await registerToken(fcmToken);
      }

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const codeTypeMap = {
          [SIGNUP_ERROR_CODE.INVALID_EMAIL_FORMAT]: "email",
          [SIGNUP_ERROR_CODE.NOT_ALLOW_EMPTY_EMAIL]: "email",
          [SIGNUP_ERROR_CODE.ALREADY_EXIST_MEMBER_WITH_DUPLICATED_EMAIL]:
            "email",
          [SIGNUP_ERROR_CODE.NOT_ALLOW_EMPTY_NAME]: "name",
          [SIGNUP_ERROR_CODE.INVALID_PASSWORD_FORMAT]: "password",
        } as const;

        setError(codeTypeMap[error.code as keyof typeof codeTypeMap], {
          type: "valid",
          message: error.message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[
        {
          key: "name",
          label: "이름",
          placeholder: "이름을 입력해주세요.",
        },
        {
          key: "email",
          label: "이메일",
          placeholder: "이메일을 입력해주세요.",
        },
        {
          key: "password",
          label: "비밀번호",
          placeholder: "비밀번호를 입력해주세요.",
        },
        {
          key: "passwordCheck",
          label: "비밀번호 확인",
          placeholder: "비밀번호를 다시 한 번 입력해주세요.",
        },
      ].map(({ key, label, placeholder }, index) => (
        <div className={index > 0 ? "mt-24" : ""} key={key}>
          <LabeledInput
            id={key}
            label={label}
            type={key.includes("password") ? "password" : "text"}
            placeholder={placeholder}
            {...register(key as SignupSchemaKey)}
            className={
              errors[key as SignupSchemaKey] &&
              "border-red-500 focus-within:border-red-500 hover:border-red-500"
            }
          />
          {errors[key as SignupSchemaKey] && (
            <p className="mt-8 inline-block text-sm font-normal text-red-500">
              {errors[key as SignupSchemaKey]?.message}
            </p>
          )}
        </div>
      ))}
      <Button
        type="submit"
        className="mt-48 w-full"
        disabled={!isDirty || !isValid}
      >
        회원가입하기
      </Button>
    </form>
  );
}
