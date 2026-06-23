import type {
  Credits,
  CrewMember,
  DiscoverParams,
  DiscoverResponse,
  DiscoverSortKey,
  Genre,
  MediaType,
  Movie,
  MovieDetail,
  MovieDetailData,
  MultiSearchResult,
  PersonDetail,
  PersonDetailData,
  PersonCreditItem,
  TMDBGenreListResponse,
  TMDBPaginatedResponse,
  TMDBVideosResponse,
  TrendingMediaItem,
  TVDetail,
  TVDetailData,
  TVShow,
  Video,
} from "@/lib/types";
import { REVALIDATE } from "./cache";
import { ApiError } from "./errors";
import {
  validateMediaId,
  validateMediaType,
  validateMovieId,
  validatePersonId,
  validateSearchQuery,
} from "./validation";
import { buildIndustryQueryString } from "@/lib/movie-industries";

const BASE_URL = "https://api.themoviedb.org/3";

const MOVIE_DISCOVER_SORT: Record<DiscoverSortKey, string> = {
  "popularity.desc": "popularity.desc",
  "popularity.asc": "popularity.asc",
  "vote_average.desc": "vote_average.desc",
  "vote_average.asc": "vote_average.asc",
  "release_date.desc": "primary_release_date.desc",
  "release_date.asc": "primary_release_date.asc",
};

const TV_DISCOVER_SORT: Record<DiscoverSortKey, string> = {
  "popularity.desc": "popularity.desc",
  "popularity.asc": "popularity.asc",
  "vote_average.desc": "vote_average.desc",
  "vote_average.asc": "vote_average.asc",
  "release_date.desc": "first_air_date.desc",
  "release_date.asc": "first_air_date.asc",
};

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new ApiError("Service configuration error", 500);
  }
  return apiKey;
}

async function tmdbFetch<T>(
  path: string,
  revalidate: number = REVALIDATE.movies
): Promise<T> {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${separator}api_key=${getApiKey()}`;

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    const message =
      response.status === 404 ? "Resource not found" : "TMDB API request failed";
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

function findTrailer(videos: Video[]): Video | null {
  return (
    videos.find((video) => video.type === "Trailer" && video.site === "YouTube") ??
    null
  );
}

function pickCrewRole(crew: CrewMember[], job: string): CrewMember | null {
  return crew.find((member) => member.job === job) ?? null;
}

function splitCredits(credits: Credits) {
  return {
    cast: credits.cast.slice(0, 20),
    director: pickCrewRole(credits.crew, "Director"),
    writer:
      pickCrewRole(credits.crew, "Screenplay") ??
      pickCrewRole(credits.crew, "Writer"),
  };
}

export async function fetchTrendingMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/trending/movie/week?page=${page}`
  );
  return data.results;
}

export async function fetchTrendingTV(page = 1): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<TVShow>>(
    `/trending/tv/week?page=${page}`
  );
  return data.results;
}

export async function fetchTrendingAll(
  timeWindow: "day" | "week" = "day",
  page = 1
): Promise<TrendingMediaItem[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<TrendingMediaItem>>(
    `/trending/all/${timeWindow}?page=${page}`
  );
  return data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
}

export async function fetchNowPlayingMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/movie/now_playing?page=${page}`
  );
  return data.results;
}

export async function fetchTopRatedMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/movie/top_rated?page=${page}`
  );
  return data.results;
}

export async function fetchTopRatedTV(page = 1): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<TVShow>>(
    `/tv/top_rated?page=${page}`
  );
  return data.results;
}

export async function fetchBollywoodMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/discover/movie?with_original_language=hi&sort_by=popularity.desc&page=${page}`
  );
  return data.results;
}

export async function fetchHollywoodMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/discover/movie?with_original_language=en&region=US&sort_by=popularity.desc&page=${page}`
  );
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const normalizedQuery = validateSearchQuery(query);

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(
    `/search/movie?query=${encodeURIComponent(normalizedQuery)}`,
    REVALIDATE.search
  );
  return data.results;
}

export async function searchMulti(query: string): Promise<MultiSearchResult[]> {
  const normalizedQuery = validateSearchQuery(query);

  const data = await tmdbFetch<TMDBPaginatedResponse<MultiSearchResult>>(
    `/search/multi?query=${encodeURIComponent(normalizedQuery)}`,
    REVALIDATE.search
  );

  return data.results.filter(
    (item) =>
      item.media_type === "movie" ||
      item.media_type === "tv" ||
      item.media_type === "person"
  );
}

export async function fetchGenres(mediaType: MediaType): Promise<Genre[]> {
  const type = validateMediaType(mediaType);
  const data = await tmdbFetch<TMDBGenreListResponse>(`/genre/${type}/list`);
  return data.genres;
}

export async function discoverMedia(
  mediaType: MediaType,
  {
    page = 1,
    genreId = null,
    sortBy = "popularity.desc",
    industryId = null,
  }: DiscoverParams = {}
): Promise<DiscoverResponse> {
  const type = validateMediaType(mediaType);
  const sortMap = type === "movie" ? MOVIE_DISCOVER_SORT : TV_DISCOVER_SORT;
  const sort = sortMap[sortBy];
  const genreParam = genreId ? `&with_genres=${genreId}` : "";
  const industryParam =
    type === "movie" ? buildIndustryQueryString(industryId) : "";

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie | TVShow>>(
    `/discover/${type}?sort_by=${sort}&page=${page}${genreParam}${industryParam}`
  );

  return {
    page: data.page,
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
}

export async function fetchMovieDetail(id: string): Promise<MovieDetailData> {
  const movieId = validateMovieId(id);

  const [movie, videos, similar, credits] = await Promise.all([
    tmdbFetch<MovieDetail>(`/movie/${movieId}?language=en-US`, REVALIDATE.detail),
    tmdbFetch<TMDBVideosResponse>(
      `/movie/${movieId}/videos?language=en-US`,
      REVALIDATE.detail
    ),
    tmdbFetch<TMDBPaginatedResponse<Movie>>(
      `/movie/${movieId}/similar?language=en-US`,
      REVALIDATE.detail
    ),
    tmdbFetch<Credits>(`/movie/${movieId}/credits?language=en-US`, REVALIDATE.detail),
  ]);

  const { cast, director, writer } = splitCredits(credits);

  return {
    movie,
    trailer: findTrailer(videos.results),
    similarMovies: similar.results,
    cast,
    director,
    writer,
  };
}

export async function fetchTVDetail(id: string): Promise<TVDetailData> {
  const tvId = validateMediaId(id);

  const [show, videos, similar, credits] = await Promise.all([
    tmdbFetch<TVDetail>(`/tv/${tvId}?language=en-US`, REVALIDATE.detail),
    tmdbFetch<TMDBVideosResponse>(
      `/tv/${tvId}/videos?language=en-US`,
      REVALIDATE.detail
    ),
    tmdbFetch<TMDBPaginatedResponse<TVShow>>(
      `/tv/${tvId}/similar?language=en-US`,
      REVALIDATE.detail
    ),
    tmdbFetch<Credits>(`/tv/${tvId}/credits?language=en-US`, REVALIDATE.detail),
  ]);

  const { cast, director, writer } = splitCredits(credits);

  return {
    show,
    trailer: findTrailer(videos.results),
    similarShows: similar.results,
    cast,
    director,
    writer,
  };
}

export async function fetchPersonDetail(id: string): Promise<PersonDetailData> {
  const personId = validatePersonId(id);

  const [person, credits] = await Promise.all([
    tmdbFetch<PersonDetail>(`/person/${personId}?language=en-US`, REVALIDATE.detail),
    tmdbFetch<{ cast: PersonCreditItem[] }>(
      `/person/${personId}/combined_credits?language=en-US`,
      REVALIDATE.detail
    ),
  ]);

  const movieCredits = credits.cast
    .filter((item) => item.media_type === "movie")
    .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
    .slice(0, 20);

  const tvCredits = credits.cast
    .filter((item) => item.media_type === "tv")
    .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
    .slice(0, 20);

  return {
    person,
    movieCredits,
    tvCredits,
  };
}

export async function fetchRecommendations(
  mediaType: MediaType,
  id: string
): Promise<(Movie | TVShow)[]> {
  const type = validateMediaType(mediaType);
  const mediaId = validateMediaId(id);

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie | TVShow>>(
    `/${type}/${mediaId}/recommendations?language=en-US`
  );

  return data.results;
}
