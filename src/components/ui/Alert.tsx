import clsx from "clsx";
import type { ComponentProps } from "react";

interface AlertProps extends ComponentProps<"div"> {
  text: string | undefined;
  variant?: "error" | "success" | "warning";
}

const Alert = ({ text, variant, ...props }: AlertProps) => {
  let icon: string | null = null;

  switch (variant) {
    case "error":
      icon = "error";
      break;
    case "success":
      icon = "check_circle";
      break;
    case "warning":
      icon = "warning";
      break;
    default:
      icon = null;
  }

  return (
    <div className="fixed top-25 left-1/2 z-50 w-80 -translate-x-1/2 sm:top-30">
      <div
        role="alert"
        className={clsx("alert", variant && `alert-${variant}`)}
        {...props}
      >
        <div className="flex items-center">
          {icon && (
            <span
              className="material-symbols-outlined mr-3 flex items-center justify-center"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <span>{text}</span>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center rounded-lg"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <span className="material-symbols-outlined !text-xl !font-medium">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
