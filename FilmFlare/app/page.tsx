import type { Metadata } from "next";
import { Suspense } from "react";
import HomeContent from "@/components/movies/HomeContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  fetchBollywoodMovies,
  fetchHollywoodMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "@/lib/api/tmdb";
import { parseHomePages } from "@/lib/home-params";
import type { Movie } from "@/lib/types";

export const metadata: Metadata = {
  title: "Movies",
  description: "Discover trending, top-rated, Bollywood, and Hollywood movies",
  openGraph: {
    title: "Movies | FilmFlare",
    description: "Discover trending, top-rated, Bollywood, and Hollywood movies",
  },
};

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function fetchSection(
  fetcher: (page: number) => Promise<Movie[]>,
  page: number
): Promise<Movie[]> {
  try {
    return await fetcher(page);
  } catch {
    return [];
  }
}

async function HomePageData({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const pages = parseHomePages(params);

  const [trending, topRated, bollywood, hollywood] = await Promise.all([
    fetchSection(fetchTrendingMovies, pages.trendingPage),
    fetchSection(fetchTopRatedMovies, pages.topRatedPage),
    fetchSection(fetchBollywoodMovies, pages.bollywoodPage),
    fetchSection(fetchHollywoodMovies, pages.hollywoodPage),
  ]);

  return (
    <HomeContent
      data={{
        trending,
        topRated,
        bollywood,
        hollywood,
        ...pages,
      }}
    />
  );
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading movies..." />}>
      <HomePageData searchParams={searchParams} />
    </Suspense>
  );
}
