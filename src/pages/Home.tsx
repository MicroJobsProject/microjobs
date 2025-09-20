//DEPENDENCIES
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

//NATIVE
import Page from "../components/Layout/Page";
import { useAppSelector } from "../store";
import { useAdvertsLoadAction, useUiResetError } from "../store/hooks";
import { getAdverts, getPagination, getUi } from "../store/selectors";
import AdvertCard from "../components/advert/AdvertCard";
import Pagination from "../components/advert/Pagination";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("1");
  const advertsLoadAction = useAdvertsLoadAction();
  const uiResetErrorAction = useUiResetError();
  const adverts = useAppSelector(getAdverts);
  const { pending, error } = useAppSelector(getUi);
  const { page, totalPages } = useAppSelector(getPagination);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage.toString());
    console.log(currentPage);
  }

  useEffect(() => {
    advertsLoadAction({ page: currentPage });
  }, [currentPage]);

  return (
    <Page>
      <h1>Welcome Home</h1>
      <p>This is the home page</p>
      <div className="mx-auto max-w-7xl px-6 py-8">
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
          <p>Advert empty</p>
        )}
      </div>
      <Pagination
        current={parseInt(currentPage)}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </Page>
  );
}
