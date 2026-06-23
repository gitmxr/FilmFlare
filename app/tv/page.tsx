import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreContent from "@/components/explore/ExploreContent";
import BrowsePageSkeleton from "@/components/ui/skeletons/BrowsePageSkeleton";
import { discoverMedia, fetchGenres } from "@/lib/api/tmdb";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseTvBrowseParams } from "@/lib/tv-params";
import { getTvRegion } from "@/lib/tv-regions";

/** TV browse ISR — aligns with TMDB discover cache TTL. */
export const revalidate = 3600;

interface TvBrowsePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: TvBrowsePageProps): Promise<Metadata> {
  const params = await searchParams;
  const regionRaw =
    typeof params.region === "string" ? params.region : undefined;
  const region = regionRaw ? getTvRegion(regionRaw) : undefined;

  const title =
    region && region.id !== "all"
      ? `${region.label} TV & Web Series`
      : "TV & Web Series";

  const description =
    region && region.id !== "all"
      ? `Browse ${region.label} TV shows and web series by genre and rating on CineFilly.`
      : "Browse and filter TV shows and web series by genre, region, and rating on CineFilly";

  return buildPageMetadata({ title, description, path: "/tv" });
}

async function TvBrowsePageData({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { genreId, sortBy, regionId, page } = parseTvBrowseParams(params);

  const [genres, initialData] = await Promise.all([
    fetchGenres("tv").catch(() => []),
    discoverMedia("tv", { page, genreId, sortBy, regionId }).catch(() => ({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    })),
  ]);

  return (
    <ExploreContent
      key={`${genreId ?? "all"}-${sortBy}-${regionId}-${page}`}
      mediaType="tv"
      genres={genres}
      initialData={initialData}
      initialGenre={genreId}
      initialSort={sortBy}
      initialRegion={regionId}
    />
  );
}

export default function TvBrowsePage({ searchParams }: TvBrowsePageProps) {
  return (
    <Suspense fallback={<BrowsePageSkeleton showRegionFilter />}>
      <TvBrowsePageData searchParams={searchParams} />
    </Suspense>
  );
}
