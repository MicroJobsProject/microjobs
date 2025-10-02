import type { ComponentProps } from "react";

interface AdvertCategoryProps extends ComponentProps<"input"> {
  name: string;
  icon?: string;
}

const AdvertCategory = ({ name, icon, ...props }: AdvertCategoryProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <input
        type="radio"
        className="peer pointer-events-none absolute opacity-0"
        id={name}
        value={name}
        name="category"
        required
        {...props}
      />
      <label
        htmlFor={name}
        className="input-radio-label flex grow flex-row items-center justify-start gap-2"
      >
        <span className="material-symbols-outlined text-3xl">{icon}</span>
        {name}
      </label>
    </div>
  );
};

export default AdvertCategory;
