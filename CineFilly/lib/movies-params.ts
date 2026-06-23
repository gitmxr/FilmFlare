import {
  parsePageNumber,
  validateDiscoverSort,
  validateGenreId,
  validateMovieIndustry,
} from "@/lib/api/validation";
import { DEFAULT_MOVIE_INDUSTRY } from "@/lib/movie-industries";

export function parseMoviesBrowseParams(
  params: Record<string, string | string[] | undefined>
) {
  const genreRaw = typeof params.genre === "string" ? params.genre : undefined;
  const sortRaw = typeof params.sort === "string" ? params.sort : undefined;
  const industryRaw =
    typeof params.industry === "string" ? params.industry : undefined;
  const pageRaw = typeof params.page === "string" ? params.page : undefined;

  return {
    genreId: validateGenreId(genreRaw),
    sortBy: validateDiscoverSort(sortRaw),
    industryId: validateMovieIndustry(industryRaw ?? DEFAULT_MOVIE_INDUSTRY),
    page: parsePageNumber(pageRaw),
  };
}
