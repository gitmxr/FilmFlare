import {
  parsePageNumber,
  validateDiscoverSort,
  validateGenreId,
  validateTvRegion,
} from "@/lib/api/validation";
import { DEFAULT_TV_REGION } from "@/lib/tv-regions";

export function parseTvBrowseParams(
  params: Record<string, string | string[] | undefined>
) {
  const genreRaw = typeof params.genre === "string" ? params.genre : undefined;
  const sortRaw = typeof params.sort === "string" ? params.sort : undefined;
  const regionRaw =
    typeof params.region === "string" ? params.region : undefined;
  const pageRaw = typeof params.page === "string" ? params.page : undefined;

  return {
    genreId: validateGenreId(genreRaw),
    sortBy: validateDiscoverSort(sortRaw),
    regionId: validateTvRegion(regionRaw ?? DEFAULT_TV_REGION),
    page: parsePageNumber(pageRaw),
  };
}
