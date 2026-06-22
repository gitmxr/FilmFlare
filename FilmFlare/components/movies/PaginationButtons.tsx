"use client";

import type { MoviePageParam } from "@/lib/types";

interface PaginationButtonsProps {
  page: number;
  param: MoviePageParam;
  onPageChange: (param: MoviePageParam, page: number) => void;
  isPending?: boolean;
  hasNextPage?: boolean;
}

export default function PaginationButtons({
  page,
  param,
  onPageChange,
  isPending = false,
  hasNextPage = true,
}: PaginationButtonsProps) {
  return (
    <nav
      className="mt-4 flex justify-end gap-2"
      aria-label={`${param} pagination`}
    >
      <button
        type="button"
        onClick={() => onPageChange(param, page - 1)}
        disabled={page <= 1 || isPending}
        aria-label="Previous page"
        className={`rounded px-4 py-1 transition ${
          page <= 1 || isPending
            ? "cursor-not-allowed bg-gray-600 text-gray-300"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        ← Prev
      </button>
      <button
        type="button"
        onClick={() => onPageChange(param, page + 1)}
        disabled={isPending || !hasNextPage}
        aria-label="Next page"
        className="rounded bg-red-600 px-4 py-1 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Next →
      </button>
    </nav>
  );
}
