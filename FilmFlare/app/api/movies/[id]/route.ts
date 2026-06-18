import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { fetchMovieDetail } from "@/lib/api/tmdb";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return handleApiRoute(
    () => fetchMovieDetail(id),
    CACHE_HEADERS.detail
  );
}
