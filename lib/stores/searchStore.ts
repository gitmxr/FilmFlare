import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Movie } from "@/lib/types";

import { devtoolsConfig } from "@/lib/stores/devtools";

const MAX_SEARCH_HISTORY = 5;

interface SearchStore {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  setQuery: (query: string) => void;
  setResults: (results: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchStore>()(
  devtools(
    persist(
      (set, get) => ({
        query: "",
        results: [],
        loading: false,
        error: null,
        searchHistory: [],
        setQuery: (query) => set({ query }),
        setResults: (results) => set({ results }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        addToHistory: (query) => {
          const trimmed = query.trim();
          if (!trimmed) return;

          const history = get().searchHistory.filter((item) => item !== trimmed);
          set({
            searchHistory: [trimmed, ...history].slice(0, MAX_SEARCH_HISTORY),
          });
        },
        clearHistory: () => set({ searchHistory: [] }),
        reset: () =>
          set({
            query: "",
            results: [],
            loading: false,
            error: null,
          }),
      }),
      {
        name: "cinefilly-search",
        partialize: (state) => ({ searchHistory: state.searchHistory }),
      }
    ),
    { name: "SearchStore", ...devtoolsConfig }
  )
);
