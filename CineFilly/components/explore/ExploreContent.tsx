"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MediaCard from "@/components/media/MediaCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { DISCOVER_SORT_OPTIONS } from "@/lib/explore-constants";
import { CARD_GRID_CLASS } from "@/lib/card-layout";
import { fetcher } from "@/lib/api/client";
import type { DiscoverResponse, Genre, MediaType, Movie, TVShow } from "@/lib/types";

interface ExploreContentProps {
  mediaType: MediaType;
  genres: Genre[];
  initialData: DiscoverResponse;
  initialGenre: number | null;
  initialSort: string;
}

export default function ExploreContent({
  mediaType,
  genres,
  initialData,
  initialGenre,
  initialSort,
}: ExploreContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Array<Movie | TVShow>>(
    initialData.results as Array<Movie | TVShow>
  );
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.total_pages);
  const [genreId, setGenreId] = useState<string>(
    initialGenre ? String(initialGenre) : ""
  );
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = mediaType === "movie" ? "Explore Movies" : "Explore TV Shows";

  const buildUrl = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (genreId) params.set("genre", genreId);
      else params.delete("genre");
      params.set("sort", sort);
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");
      const query = params.toString();
      router.replace(`/explore/${mediaType}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [genreId, mediaType, router, searchParams, sort]
  );

  const fetchDiscover = useCallback(
    async (nextPage: number, append: boolean) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ page: String(nextPage), sort });
        if (genreId) params.set("genre", genreId);

        const data = await fetcher<DiscoverResponse>(
          `/api/discover/${mediaType}?${params.toString()}`
        );

        setPage(data.page);
        setTotalPages(data.total_pages);
        setItems((current) =>
          append
            ? [...current, ...(data.results as Array<Movie | TVShow>)]
            : (data.results as Array<Movie | TVShow>)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load results");
      } finally {
        setLoading(false);
      }
    },
    [genreId, mediaType, sort]
  );

  const handleFilterChange = async (nextGenre: string, nextSort: string) => {
    setGenreId(nextGenre);
    setSort(nextSort);
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page: "1", sort: nextSort });
      if (nextGenre) params.set("genre", nextGenre);

      const data = await fetcher<DiscoverResponse>(
        `/api/discover/${mediaType}?${params.toString()}`
      );

      setItems(data.results as Array<Movie | TVShow>);
      setPage(1);
      setTotalPages(data.total_pages);
      buildUrl(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <div className="min-h-screen bg-black px-4 pb-20 pt-6 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 border-l-4 border-red-600 pl-4 text-3xl font-bold">
          {title}
        </h1>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <label className="flex flex-col gap-2 text-sm text-gray-300 lg:w-96">
            Select genres
            <select
              value={genreId}
              onChange={(event) =>
                handleFilterChange(event.target.value, sort)
              }
              className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:border-red-500"
            >
              <option value="">All genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300 lg:w-96">
            Sort by
            <select
              value={sort}
              onChange={(event) =>
                handleFilterChange(genreId, event.target.value)
              }
              className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:border-red-500"
            >
              {DISCOVER_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p role="alert" className="mb-6 text-center text-red-400">
            {error}
          </p>
        )}

        {items.length === 0 && !loading ? (
          <p className="py-12 text-center text-gray-400">No results found.</p>
        ) : (
          <div className={CARD_GRID_CLASS}>
            {items.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                mediaType={mediaType}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          {loading ? (
            <LoadingSpinner label="Loading..." />
          ) : (
            hasMore && (
              <button
                type="button"
                onClick={() => fetchDiscover(page + 1, true)}
                className="rounded-full bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Load more
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
