"use client";

import Link from "next/link";
import MediaGrid from "@/components/media/MediaGrid";
import PersonGrid from "@/components/person/PersonGrid";
import MediaGridSkeleton from "@/components/ui/skeletons/MediaGridSkeleton";
import { useMultiSearch } from "@/lib/hooks/useMultiSearch";
import type { Movie, MultiSearchResult, Person, TVShow } from "@/lib/types";

interface HomeSearchPreviewProps {
  query: string;
}

function splitResults(results: MultiSearchResult[]) {
  const movies: Movie[] = [];
  const tvShows: TVShow[] = [];
  const people: Person[] = [];

  for (const item of results) {
    if (item.media_type === "movie") movies.push(item);
    else if (item.media_type === "tv") tvShows.push(item);
    else if (item.media_type === "person") people.push(item);
  }

  return { movies, tvShows, people };
}

const PREVIEW_LIMIT = 6;

export default function HomeSearchPreview({ query }: HomeSearchPreviewProps) {
  const { data, isLoading, error } = useMultiSearch(query);
  const { movies, tvShows, people } = splitResults(data ?? []);
  const hasResults = movies.length > 0 || tvShows.length > 0 || people.length > 0;

  if (isLoading) {
    return (
      <div className="mb-10" aria-live="polite">
        <MediaGridSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="mb-10 text-center text-red-400">
        {error instanceof Error ? error.message : "Search failed"}
      </p>
    );
  }

  if (!hasResults) {
    return (
      <p className="mb-10 text-center text-gray-400">
        No results for &ldquo;{query}&rdquo;.{" "}
        <Link
          href={`/search/${encodeURIComponent(query)}`}
          className="text-red-400 hover:underline"
        >
          Try full search
        </Link>
      </p>
    );
  }

  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Quick results
        </h2>
        <Link
          href={`/search/${encodeURIComponent(query)}`}
          className="text-sm text-red-400 transition hover:text-red-300"
        >
          View all results →
        </Link>
      </div>

      {movies.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
            Movies
          </h3>
          <MediaGrid
            items={movies.slice(0, PREVIEW_LIMIT)}
            mediaType="movie"
          />
        </div>
      )}

      {tvShows.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
            TV &amp; Web Series
          </h3>
          <MediaGrid items={tvShows.slice(0, PREVIEW_LIMIT)} mediaType="tv" />
        </div>
      )}

      {people.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400">
            People
          </h3>
          <PersonGrid people={people.slice(0, PREVIEW_LIMIT)} />
        </div>
      )}
    </section>
  );
}
