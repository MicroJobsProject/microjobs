import { useState, type ReactNode, useRef, useEffect } from "react";

interface DropdownProps {
  label?: string;
  icon?: ReactNode | string;
  className?: string;
  children: ReactNode;
}

export default function Dropdown({
  label,
  icon,
  className,
  children,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={className}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {typeof icon === "string" && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        )}
        {label && <span>{label}</span>}
      </button>

      {open && (
        <div
          className="border-border bg-container absolute z-10 mt-2 w-auto rounded-md border p-3 shadow-md"
          onBlur={(child) => {
            const nextChild = child.relatedTarget as HTMLElement | null;
            if (ref.current && nextChild && !ref.current.contains(nextChild)) {
              setOpen(false);
            }
          }}
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  );
}
