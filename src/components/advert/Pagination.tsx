import clsx from "clsx";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

function Pagination({ current, total, onPageChange }: PaginationProps) {
  if (total <= 1) {
    return null;
  }

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mb-6 flex justify-center gap-2">
      <button
        onClick={() => current > 1 && onPageChange(current - 1)}
        disabled={current === 1}
        className="btn btn-secondary"
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === current}
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
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
