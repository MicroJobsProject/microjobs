import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Filter } from "../../pages/advert/types";

interface FilterProps {
  onSubmit: (filter: Filter) => void;
}

function AdvertFilter({ onSubmit }: FilterProps) {
  const [filters, setFilters] = useState<Filter>({});

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
            className="h-10.5 rounded-lg border border-gray-200 px-3 py-2"
            onChange={handleTypeChange}
          >
            <option value="">All Types</option>
            <option value="false">Need Service</option>
            <option value="true">Offer Service</option>
          </select>
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
