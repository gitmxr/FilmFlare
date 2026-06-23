import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { validateMediaType } from "@/lib/api/validation";
import { fetchGenres } from "@/lib/api/tmdb";

interface RouteContext {
  params: Promise<{ mediaType: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { mediaType } = await context.params;

  return handleApiRoute(async () => {
    const type = validateMediaType(mediaType);
    return fetchGenres(type);
  }, CACHE_HEADERS.movies);
}
