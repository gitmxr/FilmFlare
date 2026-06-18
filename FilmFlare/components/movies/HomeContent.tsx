"use client";

import { FormEvent, useEffect, useTransition } from "react";
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

  const sections = useMovieStore((state) => state.sections);
  const pages = useMovieStore((state) => state.pages);
  const syncHomeData = useMovieStore((state) => state.syncHomeData);
  const setPage = useMovieStore((state) => state.setPage);

  const query = useSearchStore((state) => state.query);
  const results = useSearchStore((state) => state.results);
  const searchLoading = useSearchStore((state) => state.loading);
  const searchHistory = useSearchStore((state) => state.searchHistory);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setResults = useSearchStore((state) => state.setResults);
  const setLoading = useSearchStore((state) => state.setLoading);
  const setError = useSearchStore((state) => state.setError);
  const addToHistory = useSearchStore((state) => state.addToHistory);

  const debouncedQuery = useDebouncedValue(query, 500);
  const { data: searchResults, isLoading: isSearching, error: searchError } =
    useMovieSearch(debouncedQuery);

  useEffect(() => {
    syncHomeData(data);
  }, [data, syncHomeData]);

  useEffect(() => {
    setLoading(isSearching);

    if (searchResults) {
      setResults(searchResults);
      if (debouncedQuery.trim() && searchResults.length > 0) {
        addToHistory(debouncedQuery);
      }
    }

    if (searchError) {
      setError(
        searchError instanceof Error ? searchError.message : "Search failed"
      );
    } else {
      setError(null);
    }
  }, [
    isSearching,
    searchResults,
    searchError,
    debouncedQuery,
    setLoading,
    setResults,
    setError,
    addToHistory,
  ]);

  const handlePageChange = (param: MoviePageParam, page: number) => {
    if (page < 1) return;

    setPage(param, page);
    const nextUrl = buildHomePageUrl(searchParams, param, page);
    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  const showSearchResults =
    debouncedQuery.trim().length > 0 && results.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 sm:pt-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          isSearching={searchLoading && debouncedQuery.trim().length > 0}
          history={searchHistory}
          onSelectHistory={setQuery}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-start justify-center bg-black/40 pt-12">
            <LoadingSpinner label="Loading movies..." />
          </div>
        )}

        {showSearchResults && (
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            className="mb-10"
          >
            <div className="mb-4 w-full text-left">
              <div className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-2xl font-semibold text-white shadow-lg">
                🔍 Search Results
              </div>
            </div>
            <MovieGrid movies={results} />
          </motion.section>
        )}

        {debouncedQuery.trim().length > 0 &&
          !searchLoading &&
          results.length === 0 && (
            <p className="mb-10 text-center text-gray-400">
              No movies found for &ldquo;{debouncedQuery}&rdquo;
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
