import type { Movie, TVShow, TrendingMediaItem } from "@/lib/types";
import { CARD_SECTION_TITLE_CLASS } from "@/lib/card-layout";
import MediaCard from "./MediaCard";
import Carousel from "@/components/ui/Carousel";

interface MediaCarouselSectionProps {
  title: string;
  items: Array<Movie | TVShow | TrendingMediaItem>;
  mediaType?: "movie" | "tv";
  action?: React.ReactNode;
}

export default function MediaCarouselSection({
  title,
  items,
  mediaType,
  action,
}: MediaCarouselSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className={CARD_SECTION_TITLE_CLASS}>{title}</h2>
        {action}
      </div>
      <Carousel ariaLabel={title} className="sm:px-3">
        {items.map((item) => (
          <MediaCard
            key={`${mediaType ?? ("media_type" in item ? item.media_type : "media")}-${item.id}`}
            item={item}
            mediaType={
              mediaType ??
              ("media_type" in item ? item.media_type : undefined)
            }
          />
        ))}
      </Carousel>
    </section>
  );
}
