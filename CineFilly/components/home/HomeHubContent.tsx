"use client";

import { useRouter } from "next/navigation";
import BrowseCategories from "@/components/home/BrowseCategories";
import HomeSearchPreview from "@/components/home/HomeSearchPreview";
import PopularSection from "@/components/home/PopularSection";
import TopRatedHighlights from "@/components/home/TopRatedHighlights";
import HeroBanner from "@/components/movies/HeroBanner";
import MediaCarouselSection from "@/components/media/MediaCarouselSection";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useSearchStore } from "@/lib/stores/searchStore";
import type { HomeHubData } from "@/lib/types";

interface HomeHubContentProps {
  data: HomeHubData;
}

export default function HomeHubContent({ data }: HomeHubContentProps) {
  const router = useRouter();
  const query = useSearchStore((state) => state.query);
  const searchHistory = useSearchStore((state) => state.searchHistory);
  const setQuery = useSearchStore((state) => state.setQuery);

  const trimmedQuery = query.trim();
  const debouncedQuery = useDebouncedValue(trimmedQuery, 400);
  const showSearchPreview = debouncedQuery.length >= 2;

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroBanner
        featured={data.heroFeatured}
        searchValue={query}
        onSearchChange={setQuery}
        searchHistory={searchHistory}
        onSelectHistory={setQuery}
        onSearchSubmit={() => {
          if (!trimmedQuery) return;
          router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        {showSearchPreview ? (
          <HomeSearchPreview query={debouncedQuery} />
        ) : (
          <>
            <BrowseCategories />

            <PopularSection
              movies={data.popularMovies}
              tvShows={data.popularTV}
            />

            <MediaCarouselSection
              title="Trending Today"
              items={data.trendingAll}
            />

            <MediaCarouselSection
              title="TV & Web Series"
              items={data.popularTV}
              mediaType="tv"
            />

            <TopRatedHighlights
              movies={data.topRatedMovies}
              tvShows={data.topRatedTV}
            />
          </>
        )}
      </div>
    </div>
  );
}
