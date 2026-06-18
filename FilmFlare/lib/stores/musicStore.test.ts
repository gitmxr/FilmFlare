import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMusicStore } from "@/lib/stores/musicStore";

vi.mock("@/lib/api/client", () => ({
  fetcher: vi.fn(),
}));

import { fetcher } from "@/lib/api/client";

const mockedFetcher = vi.mocked(fetcher);

describe("useMusicStore", () => {
  beforeEach(() => {
    useMusicStore.getState().reset();
    mockedFetcher.mockReset();
  });

  it("syncs section data from server props", () => {
    useMusicStore.getState().syncSections({
      indian: [{ id: { videoId: "1" }, snippet: { title: "Song", channelTitle: "Artist", publishedAt: "2024-01-01", thumbnails: {} } }],
      pakistani: [],
      english: [],
    });

    expect(useMusicStore.getState().sections.indian).toHaveLength(1);
  });

  it("submits search and stores results", async () => {
    mockedFetcher.mockResolvedValue([
      {
        id: { videoId: "abc" },
        snippet: {
          title: "Test Song",
          channelTitle: "Artist",
          publishedAt: "2024-01-01",
          thumbnails: {},
        },
      },
    ]);

    useMusicStore.getState().setSearchQuery("test song");
    await useMusicStore.getState().submitSearch();

    const state = useMusicStore.getState();
    expect(state.hasSearched).toBe(true);
    expect(state.searchResults).toHaveLength(1);
    expect(state.loading).toBe(false);
  });

  it("clears search state", () => {
    useMusicStore.getState().setSearchQuery("test");
    useMusicStore.getState().setHasSearched(true);
    useMusicStore.getState().clearSearch();

    const state = useMusicStore.getState();
    expect(state.searchQuery).toBe("");
    expect(state.hasSearched).toBe(false);
    expect(state.searchResults).toEqual([]);
  });
});
