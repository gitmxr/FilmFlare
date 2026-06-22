import type { MoviePageParam } from "@/lib/types";
import { parsePageNumber } from "@/lib/api/validation";

type SearchParams = Record<string, string | string[] | undefined>;

function parsePage(
  searchParams: SearchParams,
  key: MoviePageParam,
  fallback = 1
): number {
  const value = searchParams[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return parsePageNumber(raw, fallback);
}

export function parseHomePages(searchParams: SearchParams) {
  return {
    trendingPage: parsePage(searchParams, "trendingPage"),
    topRatedPage: parsePage(searchParams, "topRatedPage"),
    bollywoodPage: parsePage(searchParams, "bollywoodPage"),
    hollywoodPage: parsePage(searchParams, "hollywoodPage"),
  };
}

export function buildHomePageUrl(
  current: URLSearchParams,
  param: MoviePageParam,
  page: number
) {
  const params = new URLSearchParams(current.toString());
  params.set(param, String(page));
  return `?${params.toString()}`;
}
