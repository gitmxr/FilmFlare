import type { Movie, TVShow, TrendingMediaItem } from "@/lib/types";
import { CARD_GRID_CLASS } from "@/lib/card-layout";
import MediaCard from "./MediaCard";

interface MediaGridProps {
  items: Array<Movie | TVShow | TrendingMediaItem>;
  mediaType?: "movie" | "tv";
}

export default function MediaGrid({ items, mediaType }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">No items found.</p>
    );
  }

  return (
    <div className={CARD_GRID_CLASS}>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} mediaType={mediaType} />
      ))}
    </div>
  );
}
