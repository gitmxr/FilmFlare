"use client";

import useSWR from "swr";
import type { Movie } from "@/lib/types";

export function useMovieSearch(query: string) {
  const trimmed = query.trim();

  return useSWR<Movie[]>(
    trimmed ? `/api/movies/search?q=${encodeURIComponent(trimmed)}` : null
  );
}
