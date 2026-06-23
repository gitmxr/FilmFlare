import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import ExploreContent from "@/components/explore/ExploreContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ApiError } from "@/lib/api/errors";
import {
  validateDiscoverSort,
  validateGenreId,
  validateMediaType,
  parsePageNumber,
} from "@/lib/api/validation";
import { discoverMedia, fetchGenres } from "@/lib/api/tmdb";

interface ExplorePageProps {
  params: Promise<{ mediaType: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: ExplorePageProps): Promise<Metadata> {
  const { mediaType } = await params;

  try {
    const type = validateMediaType(mediaType);
    return {
      title: type === "movie" ? "Explore Movies" : "Explore TV Shows",
      description:
        type === "movie"
          ? "Browse and filter movies by genre and rating on CineFilly"
          : "Browse and filter TV shows by genre and rating on CineFilly",
    };
  } catch {
    return { title: "Explore" };
  }
}

async function ExplorePageData({
  params,
  searchParams,
}: ExplorePageProps) {
  const { mediaType } = await params;
  const query = await searchParams;

  if (mediaType === "movie") {
    const sp = new URLSearchParams();
    if (typeof query.genre === "string") sp.set("genre", query.genre);
    if (typeof query.sort === "string") sp.set("sort", query.sort);
    if (typeof query.page === "string") sp.set("page", query.page);
    if (typeof query.industry === "string") sp.set("industry", query.industry);
    const qs = sp.toString();
    redirect(`/movies${qs ? `?${qs}` : ""}`);
  }

  let type;
  try {
    type = validateMediaType(mediaType);
  } catch {
    notFound();
  }

  const genreId = validateGenreId(
    typeof query.genre === "string" ? query.genre : undefined
  );
  const sortBy = validateDiscoverSort(
    typeof query.sort === "string" ? query.sort : undefined
  );
  const page = parsePageNumber(
    typeof query.page === "string" ? query.page : undefined
  );

  const [genres, initialData] = await Promise.all([
    fetchGenres(type).catch(() => []),
    discoverMedia(type, { page, genreId, sortBy }).catch(() => ({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    })),
  ]);

  return (
    <ExploreContent
      key={`${type}-${genreId ?? "all"}-${sortBy}-${page}`}
      mediaType={type}
      genres={genres}
      initialData={initialData}
      initialGenre={genreId}
      initialSort={sortBy}
    />
  );
}

export default function ExplorePage(props: ExplorePageProps) {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading explore page..." />}>
      <ExplorePageData {...props} />
    </Suspense>
  );
}
