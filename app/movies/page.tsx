import type { Metadata } from "next";
import { Suspense } from "react";
import MoviesBrowseContent from "@/components/movies/MoviesBrowseContent";
import BrowsePageSkeleton from "@/components/ui/skeletons/BrowsePageSkeleton";
import { discoverMedia, fetchGenres } from "@/lib/api/tmdb";
import { getMovieIndustry } from "@/lib/movie-industries";
import { parseMoviesBrowseParams } from "@/lib/movies-params";
import { buildPageMetadata } from "@/lib/seo/metadata";

/** Browse grid ISR — aligns with TMDB list cache TTL. */
export const revalidate = 3600;

interface MoviesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: MoviesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const industryRaw =
    typeof params.industry === "string" ? params.industry : undefined;
  const industry = industryRaw ? getMovieIndustry(industryRaw) : undefined;

  const title = industry && industry.id !== "all"
    ? `${industry.label} Movies`
    : "Movies";

  const description = industry && industry.id !== "all"
    ? `Browse ${industry.label} movies by genre, rating, and popularity on CineFilly.`
    : "Browse movies by genre, industry, and rating — Hollywood, Bollywood, Lollywood, and more on CineFilly";

  return buildPageMetadata({ title, description, path: "/movies" });
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
    <Suspense fallback={<BrowsePageSkeleton showIndustryFilter />}>
      <MoviesPageData searchParams={searchParams} />
    </Suspense>
  );
}
