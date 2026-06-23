export const REVALIDATE = {
  /** Home, movie lists, discover grids */
  movies: 3600,
  /** Search results */
  search: 300,
  /** Movie/TV/person detail pages */
  detail: 86400,
  /** Music section carousels */
  music: 1800,
  musicSearch: 600,
} as const;

export const CACHE_HEADERS = {
  movies: "public, s-maxage=3600, stale-while-revalidate=86400",
  search: "public, s-maxage=300, stale-while-revalidate=600",
  detail: "public, s-maxage=86400, stale-while-revalidate=172800",
} as const;
