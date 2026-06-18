import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  fetchBollywoodMovies,
  fetchHollywoodMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "@/lib/api/tmdb";
import { parseHomePages } from "@/lib/home-params";

const HomeContent = dynamic(() => import("@/components/movies/HomeContent"), {
  loading: () => <LoadingSpinner label="Loading movies..." />,
});

export const metadata: Metadata = {
  title: "Movies",
  description: "Discover trending, top-rated, Bollywood, and Hollywood movies",
};

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function HomePageData({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const pages = parseHomePages(params);

  const [trending, topRated, bollywood, hollywood] = await Promise.all([
    fetchTrendingMovies(pages.trendingPage),
    fetchTopRatedMovies(pages.topRatedPage),
    fetchBollywoodMovies(pages.bollywoodPage),
    fetchHollywoodMovies(pages.hollywoodPage),
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
