import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TodoResponse } from "@/types/todo";

export type SelectOptionType = "file" | "link";

const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const todoModalSchema = z
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

export type TodoModalSchema = z.infer<typeof todoModalSchema>;

interface TodoModalFormContextProps {
  register: UseFormRegister<TodoModalSchema>;
  watch: UseFormWatch<TodoModalSchema>;
  formState: {
    errors: FieldErrors<TodoModalSchema>;
    isValid: boolean;
  };
  trigger: UseFormTrigger<TodoModalSchema>;
  handleSubmit: UseFormHandleSubmit<TodoModalSchema>;
  setValue: UseFormSetValue<TodoModalSchema>;
  selectedGoalId?: number;
  setSelectedGoalId: Dispatch<SetStateAction<number | undefined>>;
}

const TodoFormContext = createContext<TodoModalFormContextProps | null>(null);

export const useTodoFormContext = () => {
  const context = useContext(TodoFormContext);
  if (!context) {
    throw new Error("할일 모달 폼 내부에서 context를 사용해주세요요");
  }
  return context;
};

interface TodoModalProviderProps {
  todo?: TodoResponse;
  goalId?: number;
}

export default function TodoFormProvider({
  children,
  todo,
  goalId,
}: PropsWithChildren<TodoModalProviderProps>) {
  const { register, handleSubmit, watch, setValue, formState, trigger } =
    useForm<TodoModalSchema>({
      resolver: zodResolver(todoModalSchema),
      mode: "onBlur",
      defaultValues: {
        title: todo?.title || "",
        isDone: !!todo?.isDone,
      },
    });
  const [selectedGoalId, setSelectedGoalId] = useState<number | undefined>(
    goalId,
  );

  const formContextValue = useMemo(
    () => ({
      handleSubmit,
      setValue,
      register,
      watch,
      formState,
      trigger,
      selectedGoalId,
      setSelectedGoalId,
    }),
    [
      register,
      watch,
      formState,
      trigger,
      handleSubmit,
      setValue,
      selectedGoalId,
    ],
  );

  return (
    <TodoFormContext.Provider value={formContextValue}>
      {children}
    </TodoFormContext.Provider>
  );
}
