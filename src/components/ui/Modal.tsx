import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

interface ModalProps extends ComponentProps<"div"> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "default" | "destructive";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
  className,
  ...props
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-container border-border w-full max-w-md rounded-xl border p-6 shadow-lg",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <h3
          className={clsx(
            "mb-4",
            variant === "destructive" && "text-destructive",
          )}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
