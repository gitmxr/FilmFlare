import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import ExploreContent from "@/components/explore/ExploreContent";
import BrowsePageSkeleton from "@/components/ui/skeletons/BrowsePageSkeleton";
import { ApiError } from "@/lib/api/errors";
import {
  validateMediaType,
} from "@/lib/api/validation";
import { discoverMedia, fetchGenres } from "@/lib/api/tmdb";
import { parseTvBrowseParams } from "@/lib/tv-params";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getTvRegion } from "@/lib/tv-regions";

interface ExplorePageProps {
  params: Promise<{ mediaType: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** TV browse ISR — aligns with TMDB discover cache TTL. */
export const revalidate = 3600;

export async function generateMetadata({
  params,
  searchParams,
}: ExplorePageProps): Promise<Metadata> {
  const { mediaType } = await params;
  const query = await searchParams;

  if (mediaType === "movie") {
    return buildPageMetadata({
      title: "Movies",
      description: "Browse movies on CineFilly",
      path: "/movies",
    });
  }

  try {
    validateMediaType(mediaType);
    const regionRaw =
      typeof query.region === "string" ? query.region : undefined;
    const region = regionRaw ? getTvRegion(regionRaw) : undefined;
    const title =
      region && region.id !== "all"
        ? `${region.label} TV & Web Series`
        : "TV & Web Series";

    return buildPageMetadata({
      title,
      description:
        "Browse and filter TV shows and web series by genre, region, and rating on CineFilly",
      path: "/tv",
    });
  } catch {
    return buildPageMetadata({ title: "Explore", path: "/tv" });
  }
}

async function ExplorePageData({
  params,
  searchParams,
}: ExplorePageProps) {
  const { mediaType } = await params;
  const query = await searchParams;

  if (mediaType === "movie" || mediaType === "tv") {
    const sp = new URLSearchParams();
    if (typeof query.genre === "string") sp.set("genre", query.genre);
    if (typeof query.sort === "string") sp.set("sort", query.sort);
    if (typeof query.page === "string") sp.set("page", query.page);
    if (mediaType === "movie" && typeof query.industry === "string") {
      sp.set("industry", query.industry);
    }
    if (mediaType === "tv" && typeof query.region === "string") {
      sp.set("region", query.region);
    }
    const qs = sp.toString();
    const target = mediaType === "movie" ? "/movies" : "/tv";
    redirect(`${target}${qs ? `?${qs}` : ""}`);
  }

  let type;
  try {
    type = validateMediaType(mediaType);
  } catch {
    notFound();
  }

  const { genreId, sortBy, regionId, page } = parseTvBrowseParams(query);

  const [genres, initialData] = await Promise.all([
    fetchGenres(type).catch(() => []),
    discoverMedia(type, { page, genreId, sortBy, regionId }).catch(() => ({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    })),
  ]);

  return (
    <ExploreContent
      key={`${type}-${genreId ?? "all"}-${sortBy}-${regionId}-${page}`}
      mediaType={type}
      genres={genres}
      initialData={initialData}
      initialGenre={genreId}
      initialSort={sortBy}
      initialRegion={regionId}
    />
  );
}

export default function ExplorePage(props: ExplorePageProps) {
  return (
    <Suspense fallback={<BrowsePageSkeleton showRegionFilter />}>
      <ExplorePageData {...props} />
    </Suspense>
  );
}
