import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Filter } from "../../pages/advert/types";
import { useAdvertsCategoriesAction } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertsCategories } from "../../store/selectors";
import Dropdown from "../ui/Dropdown";

interface FilterProps {
  onSubmit: (filter: Filter) => void;
}

function AdvertFilter({ onSubmit }: FilterProps) {
  const [filters, setFilters] = useState<Filter>({});
  const advertsCategoriesAction = useAdvertsCategoriesAction();
  const categories = useAppSelector(getAdvertsCategories);

  useEffect(() => {
    advertsCategoriesAction();
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit(filters);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, name: value }));
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      offer: value === "" ? undefined : value === "true",
    }));
  }

  function handleCategoryChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setFilters((prev) => {
      const current = prev.category ?? [];
      return {
        ...prev,
        category: checked
          ? [...current, value]
          : current.filter((cat) => cat !== value),
      };
    });
  }

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      min: Number(value),
    }));
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      max: Number(value),
    }));
  }

  function handleReset() {
    setFilters({});
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="grid grid-cols-1 gap-4 lg:grid-cols-6"
      >
        <div className="flex flex-col lg:col-span-2">
          <label htmlFor="name" className="mb-2 font-medium">
            Search
          </label>
          <input
            type="search"
            id="name"
            name="name"
            value={filters.name ?? ""}
            placeholder="Search by name"
            maxLength={80}
            onChange={handleNameChange}
            className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="offer" className="mb-2 font-medium">
            Type
          </label>
          <select
            id="offer"
            name="offer"
            value={
              typeof filters.offer === "boolean" ? String(filters.offer) : ""
            }
            className="h-10.5 appearance-none rounded-lg border border-gray-200 px-3 py-2"
            onChange={handleTypeChange}
          >
            <option value="">All Types</option>
            <option value="false">Need Service</option>
            <option value="true">Offer Service</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium">
            Category
          </label>
          <Dropdown
            label="Select categories"
            className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-left placeholder:text-gray-200"
          >
            {categories.map((category) => (
              <div className="mb-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id={category.name.toLowerCase()}
                  name="category"
                  value={category.name.toLowerCase()}
                  checked={
                    filters.category?.includes(category.name.toLowerCase()) ??
                    false
                  }
                  onChange={handleCategoryChange}
                />
                <span
                  className="material-symbols-outlined -mb-0.5 !text-base"
                  aria-hidden="true"
                >
                  {category.icon}
                </span>
                <label htmlFor={category.name.toLowerCase()} className="w-40">
                  {category.name}
                </label>
              </div>
            ))}
          </Dropdown>
        </div>
        <div className="flex flex-col">
          <label htmlFor="min-price" className="mb-2 font-medium">
            Min. Price
          </label>
          <input
            type="number"
            id="min-price"
            name="price"
            value={filters.min ?? ""}
            placeholder="0.00€"
            min={0}
            max={99999}
            onChange={handleMinPriceChange}
            className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max-price" className="mb-2 font-medium">
            Max. Price
          </label>
          <input
            type="number"
            id="max-price"
            name="price"
            value={filters.max ?? ""}
            placeholder="0.00€"
            min={0}
            max={99999}
            onChange={handleMaxPriceChange}
            className="h-10.5 w-full rounded-lg border border-gray-200 px-3 py-2 placeholder:text-gray-200"
          />
        </div>
        <button type="submit">Apply Filters</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}

export default AdvertFilter;
