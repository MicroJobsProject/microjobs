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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
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
      >
        {icon}
        {label && <span>{label}</span>}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-auto rounded-md border border-gray-200 bg-white p-3 shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}
