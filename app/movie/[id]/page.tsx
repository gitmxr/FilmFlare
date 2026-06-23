import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetailView from "@/components/movies/MovieDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { ApiError } from "@/lib/api/errors";
import { fetchMovieDetail, fetchTrendingMovies } from "@/lib/api/tmdb";
import {
  absoluteUrl,
  buildPageMetadata,
  truncateDescription,
} from "@/lib/seo/metadata";
import { POSTER_BASE_URL } from "@/lib/types";

export const revalidate = 86400;

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const trending = await fetchTrendingMovies(1);
    return trending.slice(0, 12).map((movie) => ({
      id: String(movie.id),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { movie } = await fetchMovieDetail(id);
    const posterUrl = movie.poster_path
      ? `${POSTER_BASE_URL}${movie.poster_path}`
      : undefined;
    const description = truncateDescription(
      movie.overview,
      160,
      `Watch ${movie.title} — cast, trailer, ratings, and similar movies on CineFilly.`
    );

    return buildPageMetadata({
      title: movie.title,
      description,
      path: `/movie/${id}`,
      images: posterUrl ? [posterUrl] : undefined,
      type: "article",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return buildPageMetadata({
        title: "Movie Not Found",
        noIndex: true,
      });
    }
    return buildPageMetadata({ title: "Movie" });
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  let data;

  try {
    data = await fetchMovieDetail(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const { movie } = data;
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: truncateDescription(movie.overview, 300),
    image: posterUrl,
    datePublished: movie.release_date || undefined,
    aggregateRating:
      movie.vote_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: movie.vote_average,
            ratingCount: movie.vote_count,
            bestRating: 10,
            worstRating: 0,
          }
        : undefined,
    url: absoluteUrl(`/movie/${movie.id}`),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <MovieDetailView data={data} />
    </>
  );
}
