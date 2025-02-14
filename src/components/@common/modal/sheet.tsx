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
import splitChildrenByComponents from "@/utils/react-child-utils/split-children-by-component";

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

function SheetPortal({
  children,
  className = "",
}: PropsWithChildren<SheetCommonProps>) {
  const { open } = useSheet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ChildrenWithCloseButton = (
    <AnimatePresence>
      {open && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

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
  const { setOpen } = useSheet();

  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("fixed inset-0 bg-black opacity-50", className)}
      onClick={() => {
        if (closeOnOverlayClick) setOpen(false);
      }}
    />
  );
}

function SheetContent({
  children,
  className,
  asChild = false,
  hasCloseIcon = true,
}: SheetElementProps<"div"> & { hasCloseIcon?: boolean }) {
  const { setOpen } = useSheet();
  const [[title, description, footer], nonContentChild] =
    splitChildrenByComponents(
      [SheetTitle, SheetDescription, SheetFooter],
      children,
    );
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "fixed left-[50%] top-[50%] z-50 flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-24 border bg-white px-16 py-24 shadow-xl duration-300 md:h-auto md:max-w-520 md:overflow-auto md:rounded-xl md:px-24",
        className,
      )}
      role="dialog"
      aria-modal="true"
    >
      <div className={cn("flex justify-between")}>
        <div className="grow">{title}</div>
        {hasCloseIcon && (
          <button
            className="flex h-28 w-28 transform items-center justify-center rounded-full duration-100 hover:bg-slate-300"
            onClick={() => setOpen(false)}
          >
            <IcClose />
          </button>
        )}
      </div>
      {description}
      {nonContentChild}
      {footer}
    </Comp>
  );
}

function SheetTitle({
  children,
  className,
  asChild = false,
}: SheetElementProps<"h2">) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp className={cn("grow text-lg font-bold", className)}>{children}</Comp>
  );
}

function SheetDescription({
  children,
  className,
  asChild = false,
}: SheetElementProps<"p">) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        "grow justify-center overflow-scroll [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

interface SheetCloseProps extends SheetElementProps<"button"> {
  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function SheetFooter({
  children,
  className,
  asChild = false,
}: SheetElementProps<"div">) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn("flex w-full justify-center gap-8", className)}>
      {children}
    </Comp>
  );
}

function SheetClose({
  children,
  className,
  asChild = false,
  onClose = () => {},
}: SheetCloseProps) {
  const { setOpen } = useSheet();
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClose(e);
    setOpen(false);
  };

  return (
    <Comp
      className={cn("text-xl font-semibold", className)}
      onClick={handleClick}
      aria-label="모달 닫기"
    >
      {children}
    </Comp>
  );
}

const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
  Footer: SheetFooter,
  Close: SheetClose,
};

export default Sheet;
