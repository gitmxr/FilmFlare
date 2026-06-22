import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/music/search/route";
import { searchYouTubeMusic } from "@/lib/api/youtube";

vi.mock("@/lib/api/youtube", () => ({
  searchYouTubeMusic: vi.fn(),
}));

const mockedSearchMusic = vi.mocked(searchYouTubeMusic);

describe("GET /api/music/search", () => {
  beforeEach(() => {
    mockedSearchMusic.mockReset();
  });

  it("returns 400 when query is missing", async () => {
    const response = await GET(
      new Request("http://localhost/api/music/search")
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Search query is required" });
    expect(mockedSearchMusic).not.toHaveBeenCalled();
  });

  it("returns search results for valid query", async () => {
    mockedSearchMusic.mockResolvedValue([
      {
        id: { videoId: "dQw4w9WgXcQ" },
        snippet: {
          title: "Test Song",
          channelTitle: "Artist",
          publishedAt: "2024-01-01T00:00:00Z",
          thumbnails: { medium: { url: "https://example.com/thumb.jpg", width: 320, height: 180 } },
        },
      },
    ]);

    const response = await GET(
      new Request("http://localhost/api/music/search?q=rock")
    );

    expect(response.status).toBe(200);
    expect(mockedSearchMusic).toHaveBeenCalledWith("rock");

    const body = await response.json();
    expect(body[0].snippet.title).toBe("Test Song");
  });
});
