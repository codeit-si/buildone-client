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

import IcClose from "@/assets/icons-small/close.svg";
import Button, { ButtonProps } from "@/components/@common/button";
import usePortalClosesByEscapeKey from "@/hooks/portal/use-portal-closes-by-escape-key";
import usePortalOpen from "@/hooks/portal/use-portal-open";
import { cn } from "@/lib/cn";
import splitChildrenByComponents from "@/utils/react-utils/split-children-by-components";

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

const useModal = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

interface ModalRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function ModalRoot({
  children,
  open: openProp = false,
  onOpenChange,
}: PropsWithChildren<ModalRootProps>) {
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

function ModalPortal({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ChildrenWithCloseButton = children;

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
  const { open, setOpen } = useModal();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          aria-hidden
          className={cn("fixed inset-0 z-40 bg-gray-500", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, transition: { duration: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          onClick={() => {
            if (closeOnOverlayClick) setOpen(false);
          }}
        />
      )}
    </AnimatePresence>
  );
}

function ModalContent({
  children,
  className,
  hasCloseIcon = true,
  closeOnOverlayClick = true,
}: ComponentProps<"div"> & ModalOverlayProps & { hasCloseIcon?: boolean }) {
  const { open, setOpen } = useModal();
  const [[title, footer], nonContentChild] = splitChildrenByComponents(
    [ModalTitle, ModalFooter],
    children,
  );

  return (
    <ModalPortal>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            ref={(node) => node?.focus}
            className={cn(
              "fixed left-[50%] top-[50%] z-50 flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-24 border bg-white px-16 py-24 pb-26 pt-24 shadow-xl md:h-auto md:max-w-520 md:rounded-lg md:px-24",
              className,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <div className={cn("flex w-full justify-between")}>
              {title || <div className="grow" />}
              {hasCloseIcon && (
                <button
                  className="flex h-28 w-28 transform items-center justify-center rounded-full duration-100 hover:bg-slate-300"
                  onClick={() => setOpen(false)}
                >
                  <IcClose />
                </button>
              )}
            </div>
            <div className="grow overflow-y-auto">{nonContentChild}</div>
            {footer}
          </motion.div>
        )}
      </AnimatePresence>
      <ModalOverlay closeOnOverlayClick={closeOnOverlayClick} />
    </ModalPortal>
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

function ModalFooter({
  children,
  className,
  asChild = false,
}: ModalElementProps<"div">) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn("mt-16 flex w-full justify-center gap-8", className)}>
      {children}
    </Comp>
  );
}

interface ModalCloseProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function ModalClose({
  children,
  className,
  onClick = () => {},
  ...props
}: ModalCloseProps) {
  const { setOpen } = useModal();

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClick(e);
    setOpen(false);
  };

  return (
    <Button
      className={cn("w-full", className)}
      onClick={handleClick}
      aria-label="모달 닫기"
      {...props}
    >
      {children}
    </Button>
  );
}

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Footer: ModalFooter,
  Close: ModalClose,
};

export default Modal;
