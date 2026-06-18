"use client";

import { FormEvent, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MusicGrid from "@/components/music/MusicGrid";
import MusicSection from "@/components/music/MusicSection";
import { useMusicStore } from "@/lib/stores/musicStore";
import type { YouTubeSearchItem } from "@/lib/types";

interface MusicSections {
  indian: YouTubeSearchItem[];
  pakistani: YouTubeSearchItem[];
  english: YouTubeSearchItem[];
}

interface MusicContentProps {
  sections: MusicSections;
}

export default function MusicContent({ sections }: MusicContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const storeSections = useMusicStore((state) => state.sections);
  const searchQuery = useMusicStore((state) => state.searchQuery);
  const searchResults = useMusicStore((state) => state.searchResults);
  const hasSearched = useMusicStore((state) => state.hasSearched);
  const loading = useMusicStore((state) => state.loading);
  const error = useMusicStore((state) => state.error);
  const syncSections = useMusicStore((state) => state.syncSections);
  const setSearchQuery = useMusicStore((state) => state.setSearchQuery);
  const submitSearch = useMusicStore((state) => state.submitSearch);
  const clearSearch = useMusicStore((state) => state.clearSearch);

  useEffect(() => {
    syncSections(sections);
  }, [sections, syncSections]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitSearch();
  };

  const showSearchResults = hasSearched && searchResults.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 sm:pt-6">
        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-gray-700 shadow-lg"
        >
          <div className="flex">
            <input
              type="text"
              placeholder="Search for songs..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-grow bg-white p-2 px-4 text-black outline-none"
              aria-label="Search for songs"
            />
            <button
              type="submit"
              className="bg-red-600 px-4 text-white transition duration-200 hover:bg-red-700 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </form>

        {showSearchResults && (
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={clearSearch}
              className="text-sm text-gray-300 underline hover:text-white"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {loading ? (
          <LoadingSpinner label="Loading music..." />
        ) : showSearchResults ? (
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            className="mb-10"
          >
            <div className="mb-4 w-full text-left">
              <div className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-2xl font-semibold text-white shadow-lg">
                🔍 Search Results
              </div>
            </div>
            <MusicGrid songs={searchResults} />
          </motion.section>
        ) : hasSearched && searchResults.length === 0 ? (
          <p className="text-center text-gray-400">
            {error ?? "No songs found."}
          </p>
        ) : (
          <>
            <MusicSection title="🇮🇳 Indian Songs" songs={storeSections.indian} />
            <MusicSection
              title="🇵🇰 Pakistani Songs"
              songs={storeSections.pakistani}
            />
            <MusicSection
              title="🇬🇧 English Songs"
              songs={storeSections.english}
            />
          </>
        )}
      </div>
    </div>
  );
}
