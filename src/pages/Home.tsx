//DEPENDENCIES
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

//NATIVE
import Page from "../components/layout/Page";
import { useAppSelector } from "../store";
import { useAdvertsLoadAction, useUiResetError } from "../store/hooks";
import { getAdverts, getPagination, getUi } from "../store/selectors";
import AdvertCard from "../components/advert/AdvertCard";
import Pagination from "../components/advert/Pagination";
import Alert from "../components/ui/Alert";
import AdvertFilter from "../components/advert/AdvertFilter";
import type { Filter } from "./advert/types";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const advertsLoadAction = useAdvertsLoadAction();
  const uiResetErrorAction = useUiResetError();
  const adverts = useAppSelector(getAdverts);
  const { pending, error } = useAppSelector(getUi);
  const { totalPages } = useAppSelector(getPagination);
  const [filter, setFilter] = useState<Filter>({});
  const [page, setPage] = useState(1);

  function handleFilterSubmit(newFilter: Filter) {
    setFilter(newFilter);
    setPage(1);
  }

  function handleFilterReset() {
    setFilter({});
    setPage(1);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  useEffect(() => {
    const params: Record<string, string> = {
      page: page.toString(),
      ...(filter.name ? { name: filter.name } : {}),
      ...(typeof filter.offer === "boolean"
        ? { offer: String(filter.offer) }
        : {}),
      ...(typeof filter.min === "number" ? { min: filter.min.toString() } : {}),
      ...(typeof filter.max === "number" ? { max: filter.max.toString() } : {}),
      ...(filter.category && filter.category.length > 0
        ? { category: filter.category.join(",") }
        : {}),
    };
    const urlParams = new URLSearchParams(params);

    window.history.pushState({}, "", `?${urlParams.toString()}`);
    advertsLoadAction(params);
  }, [page, filter]);

  return (
    <>
      <Page title={t("homeTitle")}>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <section aria-labelledby="filters-heading">
            <h2 id="filters-heading" className="sr-only">
              {t("filterAdverts")}
            </h2>
            <AdvertFilter
              onSubmit={handleFilterSubmit}
              onReset={handleFilterReset}
            />
          </section>
          <section aria-labelledby="results-heading" className="min-h-162">
            <h2 id="results-heading" className="sr-only">
              {t("advertResults")}
            </h2>
            {pending ? (
              <p>Loading...</p>
            ) : adverts.length ? (
              <ul className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {adverts.map((advert) => (
                  <li key={advert._id}>
                    <Link to={`/adverts/${advert._id}`}>
                      <AdvertCard advert={advert} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <span
                  className="material-symbols-outlined text-heading !text-7xl"
                  aria-hidden="true"
                >
                  search_off
                </span>
                <h3 className="font-bold" role="heading">
                  {t("noAdvertsTitle")}
                </h3>
                <div className="text-center">
                  <p>{t("noAdvertsSubtitle")}</p>
                  <p>{t("noAdvertsParagraph")}</p>
                </div>
                <div className="flex gap-4">
                  <NavLink to="/advert/new" className="btn btn-primary">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      add
                    </span>
                    <span>{t("newAdvert")}</span>
                  </NavLink>
                  <button
                    onClick={handleFilterReset}
                    className="btn btn-outlined"
                    aria-label="Reset all filters and search again"
                  >
                    {t("resetFilters")}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
        <section>
          <Pagination
            current={page}
            total={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </Page>
      {error && (
        <Alert
          text={error.message}
          variant="error"
          onClick={() => uiResetErrorAction()}
        />
      )}
    </>
  );
}
