import { useEffect } from "react";

export default function usePortalClosesByEscapeKey(
  open: boolean,
  setOpen: (open: boolean) => void,
) {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [open, setOpen]);
}
