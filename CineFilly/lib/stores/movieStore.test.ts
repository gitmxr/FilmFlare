import { beforeEach, describe, expect, it } from "vitest";
import { useMovieStore } from "@/lib/stores/movieStore";
import type { Movie } from "@/lib/types";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  overview: "Overview",
  poster_path: "/poster.jpg",
  backdrop_path: null,
  release_date: "2024-01-01",
  vote_average: 8.5,
  vote_count: 100,
};

describe("useMovieStore", () => {
  beforeEach(() => {
    useMovieStore.getState().reset();
  });

  it("syncs home data into sections and pages", () => {
    useMovieStore.getState().syncHomeData({
      trending: [mockMovie],
      topRated: [],
      bollywood: [],
      hollywood: [],
      trendingPage: 2,
      topRatedPage: 1,
      bollywoodPage: 1,
      hollywoodPage: 1,
    });

    const state = useMovieStore.getState();
    expect(state.sections.trending).toHaveLength(1);
    expect(state.pages.trendingPage).toBe(2);
  });

  it("updates a single page param", () => {
    useMovieStore.getState().setPage("topRatedPage", 4);
    expect(useMovieStore.getState().pages.topRatedPage).toBe(4);
  });

  it("resets to initial state", () => {
    useMovieStore.getState().setLoading(true);
    useMovieStore.getState().reset();

    const state = useMovieStore.getState();
    expect(state.loading).toBe(false);
    expect(state.sections.trending).toEqual([]);
  });
});
