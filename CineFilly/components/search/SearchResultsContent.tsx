import Link from "next/link";
import MediaGrid from "@/components/media/MediaGrid";
import PersonGrid from "@/components/person/PersonGrid";
import EmptyState from "@/components/ui/EmptyState";
import type { Movie, MultiSearchResult, Person, TVShow } from "@/lib/types";

interface SearchResultsContentProps {
  query: string;
  results: MultiSearchResult[];
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

        {!hasResults && (
          <EmptyState
            title={`No results for "${query}"`}
            description="Try a different search term or browse our catalog."
            action={{ label: "Back to Home", href: "/" }}
          />
        )}

        {movies.length > 0 && (
          <section className="mb-10" aria-labelledby="search-movies-heading">
            <h2
              id="search-movies-heading"
              className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold"
            >
              Movies
            </h2>
            <MediaGrid items={movies} mediaType="movie" />
          </section>
        )}

        {tvShows.length > 0 && (
          <section className="mb-10" aria-labelledby="search-tv-heading">
            <h2
              id="search-tv-heading"
              className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold"
            >
              TV Shows
            </h2>
            <MediaGrid items={tvShows} mediaType="tv" />
          </section>
        )}

        {people.length > 0 && (
          <section className="mb-10" aria-labelledby="search-people-heading">
            <h2
              id="search-people-heading"
              className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold"
            >
              People
            </h2>
            <PersonGrid people={people} />
          </section>
        )}
      </div>
    </div>
  );
}
