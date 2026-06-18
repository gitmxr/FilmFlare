"use client";

import useSWR from "swr";
import type { MusicDetailData, YouTubeSearchItem } from "@/lib/types";

export function useMusicSearch(query: string) {
  const trimmed = query.trim();
  const searchQuery = trimmed || "latest hindi songs";

  return useSWR<YouTubeSearchItem[]>(
    `/api/music/search?q=${encodeURIComponent(searchQuery)}`
  );
}

export function useMusicDetail(id: string | null, pageToken = "") {
  const tokenParam = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}` : "";

  return useSWR<MusicDetailData>(
    id ? `/api/music/${id}${tokenParam}` : null
  );
}
