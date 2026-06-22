import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/movies/trending/route";
import { fetchTrendingMovies } from "@/lib/api/tmdb";

vi.mock("@/lib/api/tmdb", () => ({
  fetchTrendingMovies: vi.fn(),
}));

const mockedFetchTrending = vi.mocked(fetchTrendingMovies);

describe("GET /api/movies/trending", () => {
  beforeEach(() => {
    mockedFetchTrending.mockReset();
  });

  it("returns trending movies for a valid page", async () => {
    mockedFetchTrending.mockResolvedValue([
      {
        id: 1,
        title: "Trending Movie",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2024-01-01",
        vote_average: 7,
        vote_count: 50,
      },
    ]);

    const response = await GET(
      new Request("http://localhost/api/movies/trending?page=2")
    );

    expect(response.status).toBe(200);
    expect(mockedFetchTrending).toHaveBeenCalledWith(2);

    const body = await response.json();
    expect(body[0].title).toBe("Trending Movie");
  });

  it("sets cache-control header", async () => {
    mockedFetchTrending.mockResolvedValue([]);

    const response = await GET(
      new Request("http://localhost/api/movies/trending")
    );

    expect(response.headers.get("Cache-Control")).toContain("s-maxage");
  });
});
