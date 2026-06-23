import type { Metadata } from "next";
import { Suspense } from "react";
import MoviesBrowseContent from "@/components/movies/MoviesBrowseContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { discoverMedia, fetchGenres } from "@/lib/api/tmdb";
import { parseMoviesBrowseParams } from "@/lib/movies-params";

export const metadata: Metadata = {
  title: "Movies",
  description:
    "Browse movies by genre, industry, and rating — Hollywood, Bollywood, Lollywood, and more on CineFilly",
  openGraph: {
    title: "Movies | CineFilly",
    description:
      "Browse movies by genre, industry, and rating — Hollywood, Bollywood, Lollywood, and more",
  },
};

interface MoviesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function MoviesPageData({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { genreId, sortBy, industryId, page } = parseMoviesBrowseParams(params);

  const [genres, initialData] = await Promise.all([
    fetchGenres("movie").catch(() => []),
    discoverMedia("movie", { page, genreId, sortBy, industryId }).catch(() => ({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    })),
  ]);

  return (
    <MoviesBrowseContent
      key={`${genreId ?? "all"}-${sortBy}-${industryId}-${page}`}
      genres={genres}
      initialData={initialData}
      initialGenre={genreId}
      initialSort={sortBy}
      initialIndustry={industryId}
    />
  );
}

export default function MoviesPage({ searchParams }: MoviesPageProps) {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading movies..." />}>
      <MoviesPageData searchParams={searchParams} />
    </Suspense>
  );
}
