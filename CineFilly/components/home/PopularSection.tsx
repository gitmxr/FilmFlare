"use client";

import { useState } from "react";
import Link from "next/link";
import MediaCarouselSection from "@/components/media/MediaCarouselSection";
import MediaTabs from "@/components/ui/MediaTabs";
import type { Movie, TVShow } from "@/lib/types";

interface PopularSectionProps {
  movies: Movie[];
  tvShows: TVShow[];
}

export default function PopularSection({ movies, tvShows }: PopularSectionProps) {
  const [activeTab, setActiveTab] = useState<"movie" | "tv">("movie");
  const items = activeTab === "movie" ? movies : tvShows;

  return (
    <MediaCarouselSection
      title="What's Popular"
      items={items}
      mediaType={activeTab}
      action={
        <div className="flex flex-wrap items-center gap-3">
          <MediaTabs
            tabs={[
              { value: "movie", label: "Movies" },
              { value: "tv", label: "TV Shows" },
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />
          <Link
            href={activeTab === "movie" ? "/movies" : "/tv"}
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            View all →
          </Link>
        </div>
      }
    />
  );
}
