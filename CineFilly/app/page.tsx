import type { Metadata } from "next";
import { Suspense } from "react";
import HomeHubContent from "@/components/home/HomeHubContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchTopRatedTV,
  fetchTrendingAll,
  fetchTrendingMovies,
  fetchTrendingTV,
} from "@/lib/api/tmdb";
import type { TrendingMediaItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover trending movies, TV shows, web series, music, and people — all in one place on CineFilly",
  openGraph: {
    title: "CineFilly — Movies, TV & More",
    description:
      "Discover trending movies, TV shows, web series, music, and people in one place",
  },
};

async function fetchSection<T>(
  fetcher: (page: number) => Promise<T[]>,
  page = 1
): Promise<T[]> {
  try {
    return await fetcher(page);
  } catch {
    return [];
  }
}

async function fetchTrendingAllSafe(): Promise<TrendingMediaItem[]> {
  try {
    return await fetchTrendingAll("day", 1);
  } catch {
    return [];
  }
}

async function HomePageData() {
  const [popularMovies, popularTV, topRatedMovies, topRatedTV, nowPlaying, trendingAll] =
    await Promise.all([
      fetchSection(fetchTrendingMovies, 1),
      fetchSection(fetchTrendingTV, 1),
      fetchSection(fetchTopRatedMovies, 1),
      fetchSection(fetchTopRatedTV, 1),
      fetchSection(fetchNowPlayingMovies, 1),
      fetchTrendingAllSafe(),
    ]);

  const heroIndex =
    nowPlaying.length > 0
      ? new Date().getUTCDate() % Math.min(nowPlaying.length, 20)
      : 0;
  const heroFeatured = nowPlaying.length > 0 ? nowPlaying[heroIndex] : null;

  return (
    <HomeHubContent
      data={{
        nowPlaying,
        heroFeatured,
        trendingAll,
        popularMovies,
        popularTV,
        topRatedMovies,
        topRatedTV,
      }}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading..." />}>
      <HomePageData />
    </Suspense>
  );
}
