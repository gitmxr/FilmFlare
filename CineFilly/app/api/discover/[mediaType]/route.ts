import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";
import { validateGenreId, validateDiscoverSort, validateMediaType, validateMovieIndustry } from "@/lib/api/validation";
import { discoverMedia } from "@/lib/api/tmdb";

interface RouteContext {
  params: Promise<{ mediaType: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { mediaType } = await context.params;
  const { searchParams } = new URL(request.url);
  const page = parsePageParam(searchParams);
  const genreId = validateGenreId(searchParams.get("genre"));
  const sortBy = validateDiscoverSort(searchParams.get("sort"));
  const industryId =
    mediaType === "movie"
      ? validateMovieIndustry(searchParams.get("industry"))
      : null;

  return handleApiRoute(async () => {
    const type = validateMediaType(mediaType);
    return discoverMedia(type, { page, genreId, sortBy, industryId });
  }, CACHE_HEADERS.movies);
}
