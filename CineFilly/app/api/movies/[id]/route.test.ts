import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/movies/[id]/route";
import { fetchMovieDetail } from "@/lib/api/tmdb";

vi.mock("@/lib/api/tmdb", () => ({
  fetchMovieDetail: vi.fn(),
}));

const mockedFetchMovieDetail = vi.mocked(fetchMovieDetail);

describe("GET /api/movies/[id]", () => {
  beforeEach(() => {
    mockedFetchMovieDetail.mockReset();
  });

  it("returns movie detail for valid id", async () => {
    mockedFetchMovieDetail.mockResolvedValue({
      movie: {
        id: 550,
        title: "Fight Club",
        overview: "Test",
        poster_path: null,
        backdrop_path: null,
        release_date: "1999-01-01",
        vote_average: 8.4,
        vote_count: 100,
        runtime: 139,
        genres: [],
      },
      trailer: null,
      similarMovies: [],
      cast: [],
      director: null,
      writer: null,
    });

    const response = await GET(new Request("http://localhost/api/movies/550"), {
      params: Promise.resolve({ id: "550" }),
    });

    expect(response.status).toBe(200);
    expect(mockedFetchMovieDetail).toHaveBeenCalledWith("550");

    const body = await response.json();
    expect(body.movie.title).toBe("Fight Club");
  });

  it("returns 400 for invalid movie id", async () => {
    const response = await GET(new Request("http://localhost/api/movies/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });

    expect(response.status).toBe(400);
    expect(mockedFetchMovieDetail).not.toHaveBeenCalled();
  });
});
