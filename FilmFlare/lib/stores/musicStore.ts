import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { fetcher } from "@/lib/api/client";
import type { MusicSectionKey, YouTubeSearchItem } from "@/lib/types";

const devtoolsConfig = {
  enabled: process.env.NODE_ENV === "development",
};

interface MusicSections {
  indian: YouTubeSearchItem[];
  pakistani: YouTubeSearchItem[];
  english: YouTubeSearchItem[];
}

interface MusicPages {
  indianPage: number;
  pakistaniPage: number;
  englishPage: number;
}

interface MusicStore {
  sections: MusicSections;
  pages: MusicPages;
  searchQuery: string;
  searchResults: YouTubeSearchItem[];
  hasSearched: boolean;
  loading: boolean;
  error: string | null;
  setSections: (sections: Partial<MusicSections>) => void;
  syncSections: (sections: MusicSections) => void;
  setPages: (pages: Partial<MusicPages>) => void;
  setSection: (key: MusicSectionKey, items: YouTubeSearchItem[]) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: YouTubeSearchItem[]) => void;
  setHasSearched: (hasSearched: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  submitSearch: () => Promise<void>;
  clearSearch: () => void;
  reset: () => void;
}

const initialSections: MusicSections = {
  indian: [],
  pakistani: [],
  english: [],
};

const initialPages: MusicPages = {
  indianPage: 1,
  pakistaniPage: 1,
  englishPage: 1,
};

export const useMusicStore = create<MusicStore>()(
  devtools(
    (set, get) => ({
      sections: initialSections,
      pages: initialPages,
      searchQuery: "",
      searchResults: [],
      hasSearched: false,
      loading: false,
      error: null,
      setSections: (sections) =>
        set((state) => ({
          sections: { ...state.sections, ...sections },
        })),
      syncSections: (sections) => set({ sections }),
      setPages: (pages) =>
        set((state) => ({
          pages: { ...state.pages, ...pages },
        })),
      setSection: (key, items) =>
        set((state) => ({
          sections: { ...state.sections, [key]: items },
        })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSearchResults: (searchResults) => set({ searchResults }),
      setHasSearched: (hasSearched) => set({ hasSearched }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      submitSearch: async () => {
        const trimmed = get().searchQuery.trim();
        if (!trimmed) return;

        set({ loading: true, error: null, hasSearched: true });

        try {
          const data = await fetcher<YouTubeSearchItem[]>(
            `/api/music/search?q=${encodeURIComponent(trimmed)}`
          );
          set({ searchResults: data, loading: false });
        } catch (error) {
          set({
            searchResults: [],
            loading: false,
            error: error instanceof Error ? error.message : "Search failed",
          });
        }
      },
      clearSearch: () =>
        set({
          searchQuery: "",
          searchResults: [],
          hasSearched: false,
          loading: false,
          error: null,
        }),
      reset: () =>
        set({
          sections: initialSections,
          pages: initialPages,
          searchQuery: "",
          searchResults: [],
          hasSearched: false,
          loading: false,
          error: null,
        }),
    }),
    { name: "MusicStore", ...devtoolsConfig }
  )
);
