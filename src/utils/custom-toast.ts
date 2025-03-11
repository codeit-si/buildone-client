import toast from "react-hot-toast";

export const errorToast = (id: string, message: string) => {
  toast(message, {
    id,
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
};

export const successToast = (id: string, message: string) => {
  toast(message, {
    id,
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
    duration: 2_000,
  });
};
