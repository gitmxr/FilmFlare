"use client";

import { useEffect, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MovieGrid from "@/components/movies/MovieGrid";
import MovieSection from "@/components/movies/MovieSection";
import SearchBar from "@/components/movies/SearchBar";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useMovieSearch } from "@/lib/hooks/useSearch";
import { buildHomePageUrl } from "@/lib/home-params";
import { useMovieStore } from "@/lib/stores/movieStore";
import { useSearchStore } from "@/lib/stores/searchStore";
import type { HomeLoaderData, MoviePageParam } from "@/lib/types";

interface HomeContentProps {
  data: HomeLoaderData;
}

const SECTION_CONFIG: {
  title: string;
  key: "trending" | "topRated" | "bollywood" | "hollywood";
  pageKey: MoviePageParam;
}[] = [
  { title: "Trending Movies", key: "trending", pageKey: "trendingPage" },
  { title: "Top Rated Movies", key: "topRated", pageKey: "topRatedPage" },
  { title: "Bollywood Movies", key: "bollywood", pageKey: "bollywoodPage" },
  { title: "Hollywood Movies", key: "hollywood", pageKey: "hollywoodPage" },
];

export default function HomeContent({ data }: HomeContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  const syncHomeData = useMovieStore((state) => state.syncHomeData);
  const setPage = useMovieStore((state) => state.setPage);

  const query = useSearchStore((state) => state.query);
  const searchHistory = useSearchStore((state) => state.searchHistory);
  const setQuery = useSearchStore((state) => state.setQuery);
  const addToHistory = useSearchStore((state) => state.addToHistory);

  const debouncedQuery = useDebouncedValue(query, 500);
  const { data: searchResults, isLoading: isSearching, error: searchError } =
    useMovieSearch(debouncedQuery);

  useEffect(() => {
    syncHomeData(data);
  }, [data, syncHomeData]);

  useEffect(() => {
    if (searchResults && debouncedQuery.trim() && searchResults.length > 0) {
      addToHistory(debouncedQuery);
    }
  }, [searchResults, debouncedQuery, addToHistory]);

  const sections = useMemo(
    () => ({
      trending: data.trending,
      topRated: data.topRated,
      bollywood: data.bollywood,
      hollywood: data.hollywood,
    }),
    [data]
  );

  const pages = {
    trendingPage: data.trendingPage,
    topRatedPage: data.topRatedPage,
    bollywoodPage: data.bollywoodPage,
    hollywoodPage: data.hollywoodPage,
  };

  const handlePageChange = (param: MoviePageParam, page: number) => {
    if (page < 1) return;

    setPage(param, page);
    const nextUrl = buildHomePageUrl(searchParams, param, page);
    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  const trimmedQuery = debouncedQuery.trim();
  const showSearchResults = trimmedQuery.length > 0 && !isSearching && !!searchResults;
  const searchErrorMessage =
    searchError instanceof Error ? searchError.message : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 sm:pt-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          isSearching={isSearching && trimmedQuery.length > 0}
          history={searchHistory}
          onSelectHistory={setQuery}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {isPending && (
          <div
            className="absolute inset-0 z-10 flex items-start justify-center bg-black/40 pt-12"
            aria-live="polite"
            aria-busy="true"
          >
            <LoadingSpinner label="Loading movies..." />
          </div>
        )}

        {searchErrorMessage && trimmedQuery.length > 0 && (
          <p role="alert" className="mb-6 text-center text-red-400">
            {searchErrorMessage}
          </p>
        )}

        {showSearchResults && searchResults && searchResults.length > 0 && (
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            className="mb-10"
          >
            <div className="mb-4 w-full text-left">
              <div className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-2xl font-semibold text-white shadow-lg">
                <span aria-hidden="true">🔍 </span>
                Search Results
              </div>
            </div>
            <MovieGrid movies={searchResults} />
          </motion.section>
        )}

        {trimmedQuery.length > 0 &&
          !isSearching &&
          !searchErrorMessage &&
          searchResults?.length === 0 && (
            <p className="mb-10 text-center text-gray-400">
              No movies found for &ldquo;{trimmedQuery}&rdquo;
            </p>
          )}

        {SECTION_CONFIG.map(({ title, key, pageKey }) => (
          <MovieSection
            key={key}
            title={title}
            movies={sections[key]}
            page={pages[pageKey]}
            param={pageKey}
            onPageChange={handlePageChange}
            isPending={isPending}
          />
        ))}
      </div>
    </div>
  );
}
