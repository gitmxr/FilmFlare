import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TVDetailView from "@/components/tv/TVDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { ApiError } from "@/lib/api/errors";
import { fetchTrendingTV, fetchTVDetail } from "@/lib/api/tmdb";
import {
  absoluteUrl,
  buildPageMetadata,
  truncateDescription,
} from "@/lib/seo/metadata";
import { POSTER_BASE_URL } from "@/lib/types";

export const revalidate = 86400;

interface TVDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const trending = await fetchTrendingTV(1);
    return trending.slice(0, 12).map((show) => ({
      id: String(show.id),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: TVDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { show } = await fetchTVDetail(id);
    const posterUrl = show.poster_path
      ? `${POSTER_BASE_URL}${show.poster_path}`
      : undefined;
    const description = truncateDescription(
      show.overview,
      160,
      `Watch ${show.name} — cast, trailer, ratings, and similar shows on CineFilly.`
    );

    return buildPageMetadata({
      title: show.name,
      description,
      path: `/tv/${id}`,
      images: posterUrl ? [posterUrl] : undefined,
      type: "article",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return buildPageMetadata({
        title: "TV Show Not Found",
        noIndex: true,
      });
    }
    return buildPageMetadata({ title: "TV Show" });
  }
}

export default async function TVDetailPage({ params }: TVDetailPageProps) {
  const { id } = await params;
  let data;

  try {
    data = await fetchTVDetail(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const { show } = data;
  const posterUrl = show.poster_path
    ? `${POSTER_BASE_URL}${show.poster_path}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: show.name,
    description: truncateDescription(show.overview, 300),
    image: posterUrl,
    datePublished: show.first_air_date || undefined,
    aggregateRating:
      show.vote_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: show.vote_average,
            ratingCount: show.vote_count,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
    url: absoluteUrl(`/tv/${show.id}`),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <TVDetailView data={data} />
    </>
  );
}
