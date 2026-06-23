import type { Movie, TVShow, TrendingMediaItem } from "@/lib/types";

export function isTVShow(item: Movie | TVShow | TrendingMediaItem): item is TVShow {
  return "name" in item && !("title" in item);
}

export function getMediaTitle(item: Movie | TVShow | TrendingMediaItem): string {
  return isTVShow(item) ? item.name : item.title;
}

export function getMediaYear(item: Movie | TVShow | TrendingMediaItem): string {
  const date = isTVShow(item) ? item.first_air_date : item.release_date;
  return date ? date.slice(0, 4) : "N/A";
}

export function getMediaHref(
  item: Movie | TVShow | TrendingMediaItem,
  mediaType?: "movie" | "tv"
): string {
  const type =
    mediaType ?? ("media_type" in item && item.media_type ? item.media_type : isTVShow(item) ? "tv" : "movie");
  return `/${type}/${item.id}`;
}

export function getRatingColor(rating: number): string {
  if (rating < 5) return "#ef4444";
  if (rating < 7) return "#f97316";
  return "#22c55e";
}
