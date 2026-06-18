"use client";

import useSWR from "swr";
import type { Movie, MovieDetailData } from "@/lib/types";

export function useTrendingMovies(page = 1) {
  return useSWR<Movie[]>(`/api/movies/trending?page=${page}`);
}

export function useTopRatedMovies(page = 1) {
  return useSWR<Movie[]>(`/api/movies/top-rated?page=${page}`);
}

export function useBollywoodMovies(page = 1) {
  return useSWR<Movie[]>(`/api/movies/bollywood?page=${page}`);
}

export function useHollywoodMovies(page = 1) {
  return useSWR<Movie[]>(`/api/movies/hollywood?page=${page}`);
}

export function useMovieDetail(id: string | null) {
  return useSWR<MovieDetailData>(id ? `/api/movies/${id}` : null);
}
