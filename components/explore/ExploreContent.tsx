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
import { DEFAULT_TV_REGION, TV_REGIONS } from "@/lib/tv-regions";
import type { DiscoverResponse, Genre, MediaType, Movie, TVShow } from "@/lib/types";

interface ExploreContentProps {
  mediaType: MediaType;
  genres: Genre[];
  initialData: DiscoverResponse;
  initialGenre: number | null;
  initialSort: string;
  initialRegion: string;
}

export default function ExploreContent({
  mediaType,
  genres,
  initialData,
  initialGenre,
  initialSort,
  initialRegion,
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
  const [region, setRegion] = useState(initialRegion);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = useCallback(
    (
      nextPage: number,
      overrides?: { genre?: string; sort?: string; region?: string }
    ) => {
      const activeGenre = overrides?.genre ?? genreId;
      const activeSort = overrides?.sort ?? sort;
      const activeRegion = overrides?.region ?? region;
      const params = new URLSearchParams(searchParams.toString());
      if (activeGenre) params.set("genre", activeGenre);
      else params.delete("genre");
      params.set("sort", activeSort);
      if (activeRegion && activeRegion !== DEFAULT_TV_REGION) {
        params.set("region", activeRegion);
      } else {
        params.delete("region");
      }
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");
      const query = params.toString();
      router.replace(`/tv${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [genreId, region, router, searchParams, sort]
  );

  const fetchDiscover = useCallback(
    async (
      nextPage: number,
      append: boolean,
      filters?: { genre: string; sort: string; region: string }
    ) => {
      setLoading(true);
      setError(null);

      const activeGenre = filters?.genre ?? genreId;
      const activeSort = filters?.sort ?? sort;
      const activeRegion = filters?.region ?? region;

      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          sort: activeSort,
        });
        if (activeGenre) params.set("genre", activeGenre);
        if (activeRegion && activeRegion !== DEFAULT_TV_REGION) {
          params.set("region", activeRegion);
        }

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
    [genreId, mediaType, region, sort]
  );

  const handleFilterChange = async (
    nextGenre: string,
    nextSort: string,
    nextRegion: string
  ) => {
    setGenreId(nextGenre);
    setSort(nextSort);
    setRegion(nextRegion);
    setItems([]);
    await fetchDiscover(1, false, {
      genre: nextGenre,
      sort: nextSort,
      region: nextRegion,
    });
    buildUrl(1, { genre: nextGenre, sort: nextSort, region: nextRegion });
  };

  const hasMore = page < totalPages;
  const genreOptions = buildGenreFilterOptions(genres);
  const regionOptions = TV_REGIONS.map((item) => ({
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
          <h1 className="text-3xl font-bold sm:text-4xl">TV &amp; Web Series</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400 sm:text-base">
            Filter by genre, region, and rating to discover shows from around the
            world.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect
            label="Genre"
            value={genreId}
            options={genreOptions}
            onChange={(nextGenre) =>
              handleFilterChange(nextGenre, sort, region)
            }
          />
          <FilterSelect
            label="Region"
            value={region}
            options={regionOptions}
            onChange={(nextRegion) =>
              handleFilterChange(genreId, sort, nextRegion)
            }
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            options={SORT_FILTER_OPTIONS}
            onChange={(nextSort) =>
              handleFilterChange(genreId, nextSort, region)
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
            title="No shows found"
            description="Try a different genre or region filter."
            action={{ label: "Back to Home", href: "/" }}
          />
        ) : (
          <>
            <div className={CARD_GRID_CLASS}>
              {items.map((item) => (
                <MediaCard key={item.id} item={item} mediaType={mediaType} />
              ))}
            </div>
            {loading && (
              <MediaGridSkeleton count={4} className={`mt-4 ${CARD_GRID_CLASS}`} />
            )}
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
