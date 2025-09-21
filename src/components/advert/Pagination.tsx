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
        className="rounded-lg bg-transparent px-4 py-2 text-black hover:bg-gray-200"
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === current}
          className={clsx(
            "rounded-lg px-4 py-2",
            page === current
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-gray-200",
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => current < total && onPageChange(current + 1)}
        disabled={current === total}
        className="rounded-lg bg-transparent px-4 py-2 text-black hover:bg-gray-200"
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
