import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Filter } from "../../pages/advert/types";
import { useAdvertsCategoriesAction } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertsCategories } from "../../store/selectors";
import Dropdown from "../ui/Dropdown";
import { useTranslation } from "react-i18next";

interface FilterProps {
  onSubmit: (filter: Filter) => void;
  onReset: () => void;
}

function AdvertFilter({ onSubmit, onReset }: FilterProps) {
  const [filters, setFilters] = useState<Filter>({});
  const advertsCategoriesAction = useAdvertsCategoriesAction();
  const categories = useAppSelector(getAdvertsCategories);
  const { t } = useTranslation("advert-filter");

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
    <div className="border-border bg-container mb-8 rounded-xl border p-6 shadow-sm">
      <form
        role="search"
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="grid grid-cols-1 gap-4 lg:grid-cols-6"
      >
        <div className="flex flex-col lg:col-span-2">
          <label htmlFor="name" className="label">
            {t("filterSearch")}
          </label>
          <input
            type="search"
            id="name"
            name="name"
            value={filters.name ?? ""}
            placeholder={t("filterSearchPlaceholder")}
            maxLength={80}
            onChange={handleNameChange}
            autoComplete="off"
            className="input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="offer" className="label">
            {t("filterType")}
          </label>
          <select
            id="offer"
            name="offer"
            value={
              typeof filters.offer === "boolean" ? String(filters.offer) : ""
            }
            className="input"
            onChange={handleTypeChange}
          >
            <option value="">{t("advertTypeAll")}</option>
            <option value="false">{t("advertTypeNeed")}</option>
            <option value="true">{t("advertTypeOffer")}</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="label">{t("filterCategory")}</label>
          <Dropdown
            label={t("filterCategoryPlaceholder")}
            className="input truncate text-left"
          >
            <fieldset role="group" aria-labelledby="categories-label">
              <legend id="categories-label" className="sr-only">
                {t("filterCategory")}
              </legend>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <div className="input-checkbox" key={category.name}>
                    <input
                      type="checkbox"
                      id={category.name.toLowerCase()}
                      name="category"
                      value={category.name.toLowerCase()}
                      checked={
                        filters.category?.includes(
                          category.name.toLowerCase(),
                        ) ?? false
                      }
                      onChange={handleCategoryChange}
                    />
                    <span
                      className="material-symbols-outlined -mb-0.5 !text-base"
                      aria-hidden="true"
                    >
                      {category.icon}
                    </span>
                    <label
                      htmlFor={category.name.toLowerCase()}
                      className="w-40"
                    >
                      {t(`${category.name}`)}
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
            {t("priceRange")}
          </legend>
          <div className="flex w-full flex-col">
            <label htmlFor="min-price" className="label">
              {t("filterPriceMin")}
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
              className="input"
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="max-price" className="label">
              {t("filterPriceMax")}
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
              className="input"
            />
          </div>
        </fieldset>
        <div className="flex items-end justify-end gap-4">
          <button
            type="submit"
            className="btn btn-secondary"
            aria-label={t("applyFilters")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
          <button
            type="reset"
            className="btn btn-destructive"
            aria-label={t("resetFilters")}
          >
            {t("reset")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdvertFilter;
