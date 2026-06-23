import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";
import {
  validateGenreId,
  validateDiscoverSort,
  validateMediaType,
  validateMovieIndustry,
  validateTvRegion,
} from "@/lib/api/validation";
import { discoverMedia } from "@/lib/api/tmdb";

interface RouteContext {
  params: Promise<{ mediaType: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { mediaType } = await context.params;
  const { searchParams } = new URL(request.url);

  return handleApiRoute(async () => {
    const page = parsePageParam(searchParams);
    const genreId = validateGenreId(searchParams.get("genre"));
    const sortBy = validateDiscoverSort(searchParams.get("sort"));
    const type = validateMediaType(mediaType);
    const industryId =
      type === "movie"
        ? validateMovieIndustry(searchParams.get("industry"))
        : null;
    const regionId =
      type === "tv" ? validateTvRegion(searchParams.get("region")) : null;

    return discoverMedia(type, {
      page,
      genreId,
      sortBy,
      industryId,
      regionId,
    });
  }, CACHE_HEADERS.movies);
}
