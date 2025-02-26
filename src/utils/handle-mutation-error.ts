import toast from "react-hot-toast";

import { ApiError } from "@/lib/error";

export const handleMutationError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast.error(error.message);
  }
};
