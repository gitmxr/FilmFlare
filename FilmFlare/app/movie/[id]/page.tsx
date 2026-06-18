import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetailView from "@/components/movies/MovieDetailView";
import { ApiError } from "@/lib/api/errors";
import {
  fetchMovieDetail,
  fetchTrendingMovies,
} from "@/lib/api/tmdb";
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

    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: posterUrl ? [{ url: posterUrl }] : [],
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;

  try {
    const data = await fetchMovieDetail(id);
    return <MovieDetailView data={data} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
