import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TVDetailView from "@/components/tv/TVDetailView";
import { ApiError } from "@/lib/api/errors";
import { fetchTrendingTV, fetchTVDetail } from "@/lib/api/tmdb";
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

    return {
      title: show.name,
      description: show.overview,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: posterUrl ? [{ url: posterUrl }] : [],
      },
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "TV Show Not Found" };
    }
    return { title: "TV Show" };
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

  return <TVDetailView data={data} />;
}
