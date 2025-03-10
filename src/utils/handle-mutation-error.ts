import toast from "react-hot-toast";

import { ApiError } from "@/lib/error";

export const handleMutationError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast(error.message, {
      style: {
        borderRadius: "28px",
        background: "black",
        color: "white",
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "1.25rem",
      },
    });
  }
};
