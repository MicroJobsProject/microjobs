import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

function Pagination({ current, total, onPageChange }: PaginationProps) {
  const { t } = useTranslation();
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  if (total <= 1) {
    return null;
  }

  return (
    <div
      className="mb-6 flex justify-center gap-2"
      aria-label={t("ariaPagination")}
      role="navigation"
    >
      <button
        onClick={() => current > 1 && onPageChange(current - 1)}
        disabled={current === 1}
        className="btn btn-secondary"
        aria-label={t("ariaPaginationPrev")}
      >
        <span aria-hidden="true">{"<"}</span>
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === current}
          aria-label={t("ariaPage", { page: page })}
          aria-current={page === current ? "page" : undefined}
          className={clsx(
            "btn",
            page === current ? "btn-primary" : "btn-secondary",
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => current < total && onPageChange(current + 1)}
        disabled={current === total}
        className="btn btn-secondary"
        aria-label={t("ariaPaginationNext")}
      >
        <span aria-hidden="true">{">"}</span>
      </button>
    </div>
  );
}

export default Pagination;
