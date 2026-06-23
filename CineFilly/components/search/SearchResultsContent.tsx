"use client";

import Image from "next/image";
import Link from "next/link";
import MediaGrid from "@/components/media/MediaGrid";
import PersonGrid from "@/components/person/PersonGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Movie, MultiSearchResult, Person, TVShow } from "@/lib/types";

interface SearchResultsContentProps {
  query: string;
  results: MultiSearchResult[];
  loading?: boolean;
  error?: string | null;
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

export default function SearchResultsContent({
  query,
  results,
  loading = false,
  error = null,
}: SearchResultsContentProps) {
  const { movies, tvShows, people } = splitResults(results);
  const hasResults = movies.length > 0 || tvShows.length > 0 || people.length > 0;

  return (
    <div className="min-h-screen bg-black px-4 pb-20 pt-6 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-yellow-400">
          Search Results
        </h1>
        <p className="mb-8 text-gray-400">
          Showing results for &ldquo;{query}&rdquo;
        </p>

        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner label="Searching..." />
          </div>
        )}

        {error && (
          <p role="alert" className="mb-6 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && !hasResults && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="relative mb-6 h-40 w-40 opacity-70">
              <Image
                src="/images/no-results.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
            <p className="text-lg text-gray-300">
              Sorry, results not found for &ldquo;{query}&rdquo;
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-red-600 px-5 py-2 text-sm transition hover:bg-red-700"
            >
              Back to Home
            </Link>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold">
              Movies
            </h2>
            <MediaGrid items={movies} mediaType="movie" />
          </section>
        )}

        {!loading && tvShows.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold">
              TV Shows
            </h2>
            <MediaGrid items={tvShows} mediaType="tv" />
          </section>
        )}

        {!loading && people.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold">
              People
            </h2>
            <PersonGrid people={people} />
          </section>
        )}
      </div>
    </div>
  );
}
