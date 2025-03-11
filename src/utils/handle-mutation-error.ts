import { ApiError } from "@/lib/error";

import { errorToast } from "./custom-toast";

export const handleMutationError = (error: unknown) => {
  if (error instanceof ApiError) {
    errorToast(error.code, error.message);
  }
};
