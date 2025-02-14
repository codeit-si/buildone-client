import { useEffect, useState } from "react";

export default function usePortalOpen(
  defaultOpen: boolean,
  onOpenChange: (open: boolean) => void,
) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  useEffect(() => {
    if (!onOpenChange) return undefined;
    onOpenChange(open);
  }, [open, onOpenChange]);

  return [open, setOpen];
}
