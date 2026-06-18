import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/movies/search/route";
import { searchMovies } from "@/lib/api/tmdb";

vi.mock("@/lib/api/tmdb", () => ({
  searchMovies: vi.fn(),
}));

const mockedSearchMovies = vi.mocked(searchMovies);

describe("GET /api/movies/search", () => {
  beforeEach(() => {
    mockedSearchMovies.mockReset();
  });

  it("returns 400 when query is missing", async () => {
    const response = await GET(
      new Request("http://localhost/api/movies/search")
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Search query is required" });
    expect(mockedSearchMovies).not.toHaveBeenCalled();
  });

  it("returns search results for valid query", async () => {
    mockedSearchMovies.mockResolvedValue([
      {
        id: 1,
        title: "Batman",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2008-01-01",
        vote_average: 8,
        vote_count: 100,
      },
    ]);

    const response = await GET(
      new Request("http://localhost/api/movies/search?q=batman")
    );

    expect(response.status).toBe(200);
    expect(mockedSearchMovies).toHaveBeenCalledWith("batman");

    const body = await response.json();
    expect(body).toHaveLength(1);
    expect(body[0].title).toBe("Batman");
  });
});
