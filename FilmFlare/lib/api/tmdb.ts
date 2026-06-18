import type {
  Movie,
  MovieDetail,
  MovieDetailData,
  TMDBPaginatedResponse,
  TMDBVideosResponse,
  Video,
} from "@/lib/types";
import { REVALIDATE } from "./cache";
import { ApiError } from "./errors";

const BASE_URL = "https://api.themoviedb.org/3";

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new ApiError("TMDB_API_KEY is not configured", 500);
  }
  return apiKey;
}

async function tmdbFetch<T>(
  path: string,
  revalidate: number = REVALIDATE.movies
): Promise<T> {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${separator}api_key=${getApiKey()}`;

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    const message =
      response.status === 404 ? "Resource not found" : "TMDB API request failed";
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export async function fetchTrendingMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/trending/movie/week?page=${page}`
  );
  return data.results;
}

export async function fetchTopRatedMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/movie/top_rated?page=${page}`
  );
  return data.results;
}

export async function fetchBollywoodMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/discover/movie?with_original_language=hi&sort_by=popularity.desc&page=${page}`
  );
  return data.results;
}

export async function fetchHollywoodMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/discover/movie?with_original_language=en&region=US&sort_by=popularity.desc&page=${page}`
  );
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/search/movie?query=${encodeURIComponent(query.trim())}`,
    REVALIDATE.search
  );
  return data.results;
}

export async function fetchMovieDetail(id: string): Promise<MovieDetailData> {
  const [movie, videos, similar] = await Promise.all([
    tmdbFetch<MovieDetail>(`/movie/${id}?language=en-US`, REVALIDATE.detail),
    tmdbFetch<TMDBVideosResponse>(
      `/movie/${id}/videos?language=en-US`,
      REVALIDATE.detail
    ),
    tmdbFetch<TMDBPaginatedResponse<Movie>>(
      `/movie/${id}/similar?language=en-US`,
      REVALIDATE.detail
    ),
  ]);

  const trailer =
    videos.results.find(
      (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    ) ?? null;

  return {
    movie,
    trailer,
    similarMovies: similar.results,
  };
}
