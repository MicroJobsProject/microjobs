import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Filter } from "../../pages/advert/types";
import { useAdvertsCategoriesAction } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertsCategories } from "../../store/selectors";
import Dropdown from "../ui/Dropdown";

interface FilterProps {
  onSubmit: (filter: Filter) => void;
  onReset: () => void;
}

function AdvertFilter({ onSubmit, onReset }: FilterProps) {
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

    onReset();
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form
        role="search"
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
            autoComplete="off"
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
          <label className="mb-2 font-medium">Category</label>
          <Dropdown
            label="Select categories"
            className="h-10.5 w-full truncate rounded-lg border border-gray-200 px-3 py-2 text-left placeholder:text-gray-200"
          >
            <fieldset role="group" aria-labelledby="categories-label">
              <legend id="categories-label" className="sr-only">
                Categories
              </legend>
              {categories.map((category) => (
                <div
                  className="border-border has-checked:bg-primary mb-2 flex items-center gap-2 rounded-md border px-2 py-1 has-checked:text-white"
                  key={category.name}
                >
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
                    className="checked:accent-primary"
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
            </fieldset>
          </Dropdown>
        </div>
        <fieldset
          className="flex gap-4"
          role="group"
          aria-labelledby="price-range-label"
        >
          <legend id="price-range-label" className="sr-only">
            Price range
          </legend>
          <div className="flex w-full flex-col">
            <label htmlFor="min-price" className="mb-2 truncate font-medium">
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
          <div className="flex w-full flex-col">
            <label htmlFor="max-price" className="mb-2 truncate font-medium">
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
        </fieldset>
        <div className="flex items-end justify-end gap-4">
          <button
            type="submit"
            className="btn btn-secondary"
            aria-label="Apply selected filters"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            type="reset"
            className="btn btn-destructive"
            aria-label="Reset all filters"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdvertFilter;
