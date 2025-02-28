import { createContext } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

interface FormContextProps {
  register: UseFormRegister<{
    title: string;
    file?: FileList | null | undefined;
    link?: string | undefined;
  }>;
  watch: UseFormWatch<{
    title: string;
    file?: FileList | null | undefined;
    link?: string | undefined;
  }>;
  formState: {
    errors: FieldErrors<{
      title: string;
      file?: FileList | null | undefined;
      link?: string | undefined;
    }>;
  };
  trigger: UseFormTrigger<{
    title: string;
    file?: FileList | null | undefined;
    link?: string | undefined;
  }>;
}

export const FormContext = createContext<FormContextProps | null>(null);
