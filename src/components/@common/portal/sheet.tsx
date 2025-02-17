"use client";

import {
  ComponentProps,
  createContext,
  ElementType,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import IcClose from "@/assets/ic_close.svg";
import usePortalClosesByEscapeKey from "@/hooks/portal/use-portal-closes-by-escape-key";
import usePortalOpen from "@/hooks/portal/use-portal-open";
import { cn } from "@/lib/cn";

import Slot from "../slot/slot";

type SheetContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SheetCommonProps {
  className?: string;
}

type SheetElementProps<T extends ElementType> = ComponentProps<T> & {
  asChild?: boolean;
};

const sheetContext = createContext<SheetContextProps>({
  open: false,
  setOpen: () => {},
});

function useSheet() {
  const context = useContext(sheetContext);
  if (!context) throw new Error("useSheet must be used within a SheetProvider");
  return context;
}

interface SheetRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function SheetRoot({
  children,
  open: openProp = false,
  onOpenChange,
}: PropsWithChildren<SheetRootProps>) {
  const { open, setOpen } = usePortalOpen(openProp, onOpenChange);

  usePortalClosesByEscapeKey(open, setOpen);

  const providerValue = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
  );

  return (
    <sheetContext.Provider value={providerValue}>
      {children}
    </sheetContext.Provider>
  );
}

function SheetTrigger({
  children,
  className,
  asChild = false,
}: SheetElementProps<"button">) {
  const { setOpen } = useSheet();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn("", className)}
      type="button"
      onClick={() => setOpen(true)}
    >
      {children}
    </Comp>
  );
}

function SheetPortal({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ChildrenWithCloseButton = children;

  if (!isClient) return null;

  return createPortal(ChildrenWithCloseButton, document.body);
}

interface SheetOverlayProps {
  closeOnOverlayClick?: boolean;
}

function SheetOverlay({
  className,
  closeOnOverlayClick = true,
}: SheetCommonProps & SheetOverlayProps) {
  const { open, setOpen } = useSheet();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          aria-hidden
          className={cn("fixed inset-0 bg-gray-500", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.2 } }}
          onClick={() => {
            if (closeOnOverlayClick) setOpen(false);
          }}
        />
      )}
    </AnimatePresence>
  );
}

function SheetContent({
  children,
  className,
  hasCloseIcon = true,
}: ComponentProps<"div"> & { hasCloseIcon?: boolean }) {
  const { open, setOpen } = useSheet();

  return (
    <SheetPortal>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-512 flex-col gap-24 border bg-white px-16 py-24 shadow-xl md:px-24 lg:max-w-800",
              className,
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className={cn("flex justify-between")}>
              {hasCloseIcon && (
                <button
                  className="flex h-28 w-28 transform items-center justify-center rounded-full duration-100 hover:bg-slate-300"
                  onClick={() => setOpen(false)}
                >
                  <IcClose />
                </button>
              )}
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <SheetOverlay />
    </SheetPortal>
  );
}

// function SheetTitle({
//  children,
//  className,
//  asChild = false,
// }: SheetElementProps<"h2">) {
//  const Comp = asChild ? Slot : "h2";

//  return (
//    <Comp className={cn("grow text-lg font-bold", className)}>{children}</Comp>
//  );
// }

// function SheetDescription({
//  children,
//  className,
//  asChild = false,
// }: SheetElementProps<"p">) {
//  const Comp = asChild ? Slot : "p";

//  return <Comp className={cn("", className)}>{children}</Comp>;
// }

// function SheetFooter({
//  children,
//  className,
//  asChild = false,
// }: SheetElementProps<"div">) {
//  const Comp = asChild ? Slot : "div";

//  return (
//    <Comp className={cn("flex w-full justify-center gap-8", className)}>
//      {children}
//    </Comp>
//  );
// }

// interface SheetCloseProps extends SheetElementProps<"button"> {
//  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
// }

// function SheetClose({
//  children,
//  className,
//  asChild = false,
//  onClose = () => {},
// }: SheetCloseProps) {
//  const { setOpen } = useSheet();
//  const Comp = asChild ? Slot : "button";

//  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
//    onClose(e);
//    setOpen(false);
//  };

//  return (
//    <Comp
//      className={cn("text-xl font-semibold", className)}
//      onClick={handleClick}
//      aria-label="모달 닫기"
//    >
//      {children}
//    </Comp>
//  );
// }

const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Content: SheetContent,
};

export default Sheet;
