"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MediaCard from "@/components/media/MediaCard";
import EmptyState from "@/components/ui/EmptyState";
import MediaGridSkeleton from "@/components/ui/skeletons/MediaGridSkeleton";
import FilterSelect from "@/components/ui/FilterSelect";
import { CARD_GRID_CLASS } from "@/lib/card-layout";
import { fetcher } from "@/lib/api/client";
import { buildGenreFilterOptions, SORT_FILTER_OPTIONS } from "@/lib/filter-options";
import { DEFAULT_MOVIE_INDUSTRY, MOVIE_INDUSTRIES } from "@/lib/movie-industries";
import type { DiscoverResponse, Genre, Movie } from "@/lib/types";

interface MoviesBrowseContentProps {
  genres: Genre[];
  initialData: DiscoverResponse;
  initialGenre: number | null;
  initialSort: string;
  initialIndustry: string;
}

export default function MoviesBrowseContent({
  genres,
  initialData,
  initialGenre,
  initialSort,
  initialIndustry,
}: MoviesBrowseContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Movie[]>(initialData.results as Movie[]);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.total_pages);
  const [genreId, setGenreId] = useState<string>(
    initialGenre ? String(initialGenre) : ""
  );
  const [sort, setSort] = useState(initialSort);
  const [industry, setIndustry] = useState(initialIndustry);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = useCallback(
    (
      nextPage: number,
      overrides?: { genre?: string; sort?: string; industry?: string }
    ) => {
      const activeGenre = overrides?.genre ?? genreId;
      const activeSort = overrides?.sort ?? sort;
      const activeIndustry = overrides?.industry ?? industry;
      const params = new URLSearchParams(searchParams.toString());
      if (activeGenre) params.set("genre", activeGenre);
      else params.delete("genre");
      params.set("sort", activeSort);
      if (activeIndustry && activeIndustry !== DEFAULT_MOVIE_INDUSTRY) {
        params.set("industry", activeIndustry);
      } else {
        params.delete("industry");
      }
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");
      const query = params.toString();
      router.replace(`/movies${query ? `?${query}` : ""}`, { scroll: false });
    },
    [genreId, industry, router, searchParams, sort]
  );

  const fetchDiscover = useCallback(
    async (
      nextPage: number,
      append: boolean,
      filters?: { genre: string; sort: string; industry: string }
    ) => {
      setLoading(true);
      setError(null);

      const activeGenre = filters?.genre ?? genreId;
      const activeSort = filters?.sort ?? sort;
      const activeIndustry = filters?.industry ?? industry;

      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          sort: activeSort,
        });
        if (activeGenre) params.set("genre", activeGenre);
        if (activeIndustry && activeIndustry !== DEFAULT_MOVIE_INDUSTRY) {
          params.set("industry", activeIndustry);
        }

        const data = await fetcher<DiscoverResponse>(
          `/api/discover/movie?${params.toString()}`
        );

        setPage(data.page);
        setTotalPages(data.total_pages);
        setItems((current) =>
          append ? [...current, ...(data.results as Movie[])] : (data.results as Movie[])
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load results");
      } finally {
        setLoading(false);
      }
    },
    [genreId, industry, sort]
  );

  const handleFilterChange = async (
    nextGenre: string,
    nextSort: string,
    nextIndustry: string
  ) => {
    setGenreId(nextGenre);
    setSort(nextSort);
    setIndustry(nextIndustry);
    setItems([]);
    await fetchDiscover(1, false, {
      genre: nextGenre,
      sort: nextSort,
      industry: nextIndustry,
    });
    buildUrl(1, {
      genre: nextGenre,
      sort: nextSort,
      industry: nextIndustry,
    });
  };

  const hasMore = page < totalPages;
  const genreOptions = buildGenreFilterOptions(genres);
  const industryOptions = MOVIE_INDUSTRIES.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  return (
    <div className="min-h-screen bg-black px-4 pb-20 pt-6 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">
            Browse catalog
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Movies</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400 sm:text-base">
            Filter by genre, industry, and rating to explore films from Hollywood,
            Bollywood, Lollywood, and more.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Genre"
            value={genreId}
            options={genreOptions}
            onChange={(nextGenre) =>
              handleFilterChange(nextGenre, sort, industry)
            }
          />
          <FilterSelect
            label="Industry"
            value={industry}
            options={industryOptions}
            onChange={(nextIndustry) =>
              handleFilterChange(genreId, sort, nextIndustry)
            }
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            options={SORT_FILTER_OPTIONS}
            onChange={(nextSort) =>
              handleFilterChange(genreId, nextSort, industry)
            }
          />
        </div>

        {error && (
          <p role="alert" className="mb-6 text-center text-red-400">
            {error}
          </p>
        )}

        {loading && items.length === 0 ? (
          <MediaGridSkeleton count={12} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No movies found"
            description="Try a different genre, industry, or sort option."
            action={{ label: "Back to Home", href: "/" }}
          />
        ) : (
          <>
            <div className={CARD_GRID_CLASS}>
              {items.map((item) => (
                <MediaCard key={item.id} item={item} mediaType="movie" />
              ))}
            </div>
            {loading && <MediaGridSkeleton count={4} className={`mt-4 ${CARD_GRID_CLASS}`} />}
          </>
        )}

        <div className="mt-10 flex justify-center">
          {!loading && hasMore && (
            <button
              type="button"
              onClick={() => fetchDiscover(page + 1, true)}
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
