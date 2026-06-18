export const REVALIDATE = {
  movies: 3600,
  search: 300,
  detail: 86400,
  music: 1800,
  musicSearch: 600,
} as const;

export const CACHE_HEADERS = {
  movies: "public, s-maxage=3600, stale-while-revalidate=86400",
  search: "public, s-maxage=300, stale-while-revalidate=600",
  detail: "public, s-maxage=86400, stale-while-revalidate=172800",
} as const;
