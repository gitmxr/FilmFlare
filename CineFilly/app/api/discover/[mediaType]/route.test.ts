import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/discover/[mediaType]/route";
import { discoverMedia } from "@/lib/api/tmdb";

vi.mock("@/lib/api/tmdb", () => ({
  discoverMedia: vi.fn(),
}));

const mockedDiscover = vi.mocked(discoverMedia);

function createContext(mediaType: string) {
  return { params: Promise.resolve({ mediaType }) };
}

describe("GET /api/discover/[mediaType]", () => {
  beforeEach(() => {
    mockedDiscover.mockReset();
  });

  it("returns discover results for movies with industry filter", async () => {
    mockedDiscover.mockResolvedValue({
      page: 1,
      results: [
        {
          id: 1,
          title: "Test",
          overview: "",
          poster_path: null,
          backdrop_path: null,
          release_date: "2024-01-01",
          vote_average: 7,
          vote_count: 10,
        },
      ],
      total_pages: 1,
      total_results: 1,
    });

    const response = await GET(
      new Request(
        "http://localhost/api/discover/movie?industry=bollywood&page=1"
      ),
      createContext("movie")
    );

    expect(response.status).toBe(200);
    expect(mockedDiscover).toHaveBeenCalledWith("movie", {
      page: 1,
      genreId: null,
      sortBy: "popularity.desc",
      industryId: "bollywood",
      regionId: null,
    });
  });

  it("returns 400 for invalid industry filter", async () => {
    const response = await GET(
      new Request("http://localhost/api/discover/movie?industry=invalid"),
      createContext("movie")
    );

    expect(response.status).toBe(400);
    expect(mockedDiscover).not.toHaveBeenCalled();

    const body = await response.json();
    expect(body.error).toBe("Invalid industry filter");
  });

  it("returns discover results for TV with region filter", async () => {
    mockedDiscover.mockResolvedValue({
      page: 1,
      results: [
        {
          id: 1,
          name: "Show",
          overview: "",
          poster_path: null,
          backdrop_path: null,
          first_air_date: "2024-01-01",
          vote_average: 7,
          vote_count: 10,
        },
      ],
      total_pages: 1,
      total_results: 1,
    });

    const response = await GET(
      new Request("http://localhost/api/discover/tv?region=korean"),
      createContext("tv")
    );

    expect(response.status).toBe(200);
    expect(mockedDiscover).toHaveBeenCalledWith("tv", {
      page: 1,
      genreId: null,
      sortBy: "popularity.desc",
      industryId: null,
      regionId: "korean",
    });
  });

  it("returns 400 for invalid TV region", async () => {
    const response = await GET(
      new Request("http://localhost/api/discover/tv?region=invalid"),
      createContext("tv")
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Invalid region filter");
  });
});
