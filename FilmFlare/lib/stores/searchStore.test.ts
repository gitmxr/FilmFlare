import { beforeEach, describe, expect, it } from "vitest";
import { useSearchStore } from "@/lib/stores/searchStore";
import type { Movie } from "@/lib/types";

const mockMovie: Movie = {
  id: 99,
  title: "Batman",
  overview: "Dark knight",
  poster_path: null,
  backdrop_path: null,
  release_date: "2008-01-01",
  vote_average: 9,
  vote_count: 1000,
};

describe("useSearchStore", () => {
  beforeEach(() => {
    const { reset, clearHistory } = useSearchStore.getState();
    reset();
    clearHistory();
  });

  it("updates query and results", () => {
    useSearchStore.getState().setQuery("batman");
    useSearchStore.getState().setResults([mockMovie]);

    const state = useSearchStore.getState();
    expect(state.query).toBe("batman");
    expect(state.results).toHaveLength(1);
    expect(state.results[0].title).toBe("Batman");
  });

  it("tracks loading and error state", () => {
    useSearchStore.getState().setLoading(true);
    useSearchStore.getState().setError("Search failed");

    const state = useSearchStore.getState();
    expect(state.loading).toBe(true);
    expect(state.error).toBe("Search failed");
  });

  it("adds queries to history without duplicates", () => {
    const { addToHistory } = useSearchStore.getState();
    addToHistory("batman");
    addToHistory("superman");
    addToHistory("batman");

    expect(useSearchStore.getState().searchHistory).toEqual([
      "batman",
      "superman",
    ]);
  });

  it("limits history to five items", () => {
    const { addToHistory } = useSearchStore.getState();

    for (let index = 1; index <= 6; index += 1) {
      addToHistory(`query-${index}`);
    }

    expect(useSearchStore.getState().searchHistory).toHaveLength(5);
    expect(useSearchStore.getState().searchHistory[0]).toBe("query-6");
  });
});
