export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  popularity?: number;
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: Genre[];
  status?: string;
  tagline?: string;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBVideosResponse {
  id: number;
  results: Video[];
}

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export type MovieSectionKey = "trending" | "topRated" | "bollywood" | "hollywood";

export type MoviePageParam =
  | "trendingPage"
  | "topRatedPage"
  | "bollywoodPage"
  | "hollywoodPage";

export interface HomeLoaderData {
  trending: Movie[];
  topRated: Movie[];
  bollywood: Movie[];
  hollywood: Movie[];
  trendingPage: number;
  topRatedPage: number;
  bollywoodPage: number;
  hollywoodPage: number;
}

export interface MovieDetailData {
  movie: MovieDetail;
  trailer: Video | null;
  similarMovies: Movie[];
}
