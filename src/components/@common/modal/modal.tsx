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

import { cva, VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import IcClose from "@/assets/ic_close.svg";
import { cn } from "@/lib/cn";
import splitChildrenByComponents from "@/utils/react-child-utils/split-children-by-component";

import Slot from "../slot/slot";

type ModalContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ModalCommonProps {
  className?: string;
}

type ModalElementProps<T extends ElementType> = ComponentProps<T> & {
  asChild?: boolean;
};

const modalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => {},
});

function useModal() {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

interface ModalRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function ModalRoot({
  children,
  open: openProp = false,
  onOpenChange,
}: PropsWithChildren<ModalRootProps>) {
  const [open, setOpen] = useState<boolean>(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  useEffect(() => {
    if (!onOpenChange) return undefined;
    onOpenChange(open);
  }, [open, onOpenChange]);

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

  const providerValue = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
  );

  return (
    <modalContext.Provider value={providerValue}>
      {children}
    </modalContext.Provider>
  );
}

function ModalTrigger({
  children,
  className,
  asChild = false,
}: ModalElementProps<"button">) {
  const { setOpen } = useModal();
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

function ModalPortal({
  children,
  className = "",
}: PropsWithChildren<ModalCommonProps>) {
  const { open } = useModal();
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

interface ModalOverlayProps {
  closeOnOverlayClick?: boolean;
}

function ModalOverlay({
  className,
  closeOnOverlayClick = true,
}: ModalCommonProps & ModalOverlayProps) {
  const { setOpen } = useModal();

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

const ModalContentVariants = cva(
  "flex flex-col gap-24 fixed modal:px-24 left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] border bg-white px-16 py-24 shadow-xl duration-200",
  {
    variants: {
      type: {
        modal:
          "h-full modal:max-w-520 modal:overflow-auto modal:h-auto modal:rounded-xl ",
        popup: "max-w-300 modal:max-w-450 rounded-lg pt-24 pb-26 py-24",
      },
    },
    defaultVariants: {
      type: "popup",
    },
  },
);

function ModalContent({
  children,
  className,
  asChild = false,
  hasCloseIcon = true,
  type = "popup",
}: ModalElementProps<"div"> & { hasCloseIcon?: boolean } & VariantProps<
    typeof ModalContentVariants
  >) {
  const { setOpen } = useModal();
  const [[title, description, footer], nonContentChild] =
    splitChildrenByComponents(
      [ModalTitle, ModalDescription, ModalFooter],
      children,
    );
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(ModalContentVariants({ type }), className)}
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

function ModalTitle({
  children,
  className,
  asChild = false,
}: ModalElementProps<"h2">) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp className={cn("grow text-lg font-bold", className)}>{children}</Comp>
  );
}

function ModalDescription({
  children,
  className,
  asChild = false,
}: ModalElementProps<"p">) {
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

interface ModalCloseProps extends ModalElementProps<"button"> {
  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function ModalFooter({
  children,
  className,
  asChild = false,
}: ModalElementProps<"div">) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn("flex w-full justify-center gap-8", className)}>
      {children}
    </Comp>
  );
}

function ModalClose({
  children,
  className,
  asChild = false,
  onClose = () => {},
}: ModalCloseProps) {
  const { setOpen } = useModal();
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

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
  Close: ModalClose,
};

export default Modal;
