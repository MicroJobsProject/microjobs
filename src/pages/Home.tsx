//DEPENDENCIES
import { useEffect, useState } from "react";
import { Link } from "react-router";

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

export default function Home() {
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
    };

    advertsLoadAction(params);
  }, [page, filter]);

  return (
    <>
      <Page>
        <h1>Welcome Home</h1>
        <p>This is the home page</p>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <AdvertFilter onSubmit={handleFilterSubmit} />
          {pending ? (
            <p>Loading...</p>
          ) : adverts.length ? (
            <ul className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {adverts.length ? (
                adverts.map((advert) => (
                  <li key={advert._id}>
                    <Link to={`/adverts/${advert._id}`}>
                      <AdvertCard advert={advert} />
                    </Link>
                  </li>
                ))
              ) : (
                <p>Adverts not found</p>
              )}
            </ul>
          ) : (
            <p>Advert empty</p>
          )}
        </div>
        <Pagination
          current={page}
          total={totalPages}
          onPageChange={handlePageChange}
        />
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
