"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/movies/SearchBar";
import type { Movie } from "@/lib/types";
import { BACKDROP_BASE_URL } from "@/lib/types";

interface HeroBannerProps {
  featured: Movie | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isSearching?: boolean;
  searchHistory?: string[];
  onSelectHistory?: (query: string) => void;
  onSearchSubmit?: () => void;
}

export default function HeroBanner({
  featured,
  searchValue,
  onSearchChange,
  isSearching = false,
  searchHistory = [],
  onSelectHistory,
  onSearchSubmit,
}: HeroBannerProps) {
  const backdropUrl =
    featured?.backdrop_path != null
      ? `${BACKDROP_BASE_URL}${featured.backdrop_path}`
      : null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-red-400 sm:text-sm">
            Welcome to CineFilly
          </p>
          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Millions of movies, TV shows and people to discover.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-300 sm:text-base lg:text-lg">
            Explore trending films, binge-worthy series, cast profiles, and your
            favorite music — all in one place.
          </p>

          <div className="mt-6 sm:mt-8">
            <SearchBar
              variant="hero"
              value={searchValue}
              onChange={onSearchChange}
              isSearching={isSearching}
              history={searchHistory}
              onSelectHistory={onSelectHistory}
              onSubmit={onSearchSubmit}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/movies"
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:px-5"
            >
              Browse Movies
            </Link>
            <Link
              href="/explore/tv"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:border-red-500 hover:text-red-400 sm:px-5"
            >
              TV & Web Series
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
