import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Movie, MoviePageParam } from "@/lib/types";

import { devtoolsConfig } from "@/lib/stores/devtools";

interface MovieSections {
  trending: Movie[];
  topRated: Movie[];
  bollywood: Movie[];
  hollywood: Movie[];
}

interface MoviePages {
  trendingPage: number;
  topRatedPage: number;
  bollywoodPage: number;
  hollywoodPage: number;
}

interface HomeData extends MovieSections, MoviePages {}

interface MovieStore {
  sections: MovieSections;
  pages: MoviePages;
  loading: boolean;
  error: string | null;
  setSections: (sections: Partial<MovieSections>) => void;
  setPages: (pages: Partial<MoviePages>) => void;
  setPage: (param: MoviePageParam, page: number) => void;
  syncHomeData: (data: HomeData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialSections: MovieSections = {
  trending: [],
  topRated: [],
  bollywood: [],
  hollywood: [],
};

const initialPages: MoviePages = {
  trendingPage: 1,
  topRatedPage: 1,
  bollywoodPage: 1,
  hollywoodPage: 1,
};

export const useMovieStore = create<MovieStore>()(
  devtools(
    (set) => ({
      sections: initialSections,
      pages: initialPages,
      loading: false,
      error: null,
      setSections: (sections) =>
        set((state) => ({
          sections: { ...state.sections, ...sections },
        })),
      setPages: (pages) =>
        set((state) => ({
          pages: { ...state.pages, ...pages },
        })),
      setPage: (param, page) =>
        set((state) => ({
          pages: { ...state.pages, [param]: page },
        })),
      syncHomeData: (data) =>
        set({
          sections: {
            trending: data.trending,
            topRated: data.topRated,
            bollywood: data.bollywood,
            hollywood: data.hollywood,
          },
          pages: {
            trendingPage: data.trendingPage,
            topRatedPage: data.topRatedPage,
            bollywoodPage: data.bollywoodPage,
            hollywoodPage: data.hollywoodPage,
          },
        }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      reset: () =>
        set({
          sections: initialSections,
          pages: initialPages,
          loading: false,
          error: null,
        }),
    }),
    { name: "MovieStore", ...devtoolsConfig }
  )
);
