"use client";

import useSWR from "swr";
import type { MultiSearchResult } from "@/lib/types";

export function useMultiSearch(query: string) {
  const trimmed = query.trim();

  return useSWR<MultiSearchResult[]>(
    trimmed.length >= 2 ? `/api/search?q=${encodeURIComponent(trimmed)}` : null
  );
}
