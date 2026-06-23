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
  media_type?: "movie";
}

export interface MovieDetail extends Movie {
  runtime: number | null;
  genres: Genre[];
  status?: string;
  tagline?: string;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  popularity?: number;
  media_type?: "tv";
}

export interface TVDetail extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  episode_run_time: number[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
  media_type?: "person";
}

export interface PersonDetail extends Person {
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  also_known_as: string[];
}

export interface PersonCreditItem {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  character?: string;
  job?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
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

export interface TMDBGenreListResponse {
  genres: Genre[];
}

export type MediaType = "movie" | "tv";

export type TrendingMediaItem = (Movie | TVShow) & {
  media_type: "movie" | "tv";
};

export type MultiSearchResult =
  | (Movie & { media_type: "movie" })
  | (TVShow & { media_type: "tv" })
  | (Person & { media_type: "person" });

export type DiscoverSortKey =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "release_date.desc"
  | "release_date.asc";

export interface DiscoverParams {
  page?: number;
  genreId?: number | null;
  sortBy?: DiscoverSortKey;
  industryId?: string | null;
  regionId?: string | null;
}

export interface HomeHubData {
  nowPlaying: Movie[];
  heroFeatured: Movie | null;
  trendingAll: TrendingMediaItem[];
  popularMovies: Movie[];
  popularTV: TVShow[];
  topRatedMovies: Movie[];
  topRatedTV: TVShow[];
}

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
export const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export interface MovieDetailData {
  movie: MovieDetail;
  trailer: Video | null;
  similarMovies: Movie[];
  cast: CastMember[];
  director: CrewMember | null;
  writer: CrewMember | null;
}

export interface TVDetailData {
  show: TVDetail;
  trailer: Video | null;
  similarShows: TVShow[];
  cast: CastMember[];
  director: CrewMember | null;
  writer: CrewMember | null;
}

export interface PersonDetailData {
  person: PersonDetail;
  movieCredits: PersonCreditItem[];
  tvCredits: PersonCreditItem[];
}

export interface DiscoverResponse {
  page: number;
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
}
