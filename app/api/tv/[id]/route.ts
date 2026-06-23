import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { validateMediaId } from "@/lib/api/validation";
import { fetchTVDetail } from "@/lib/api/tmdb";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return handleApiRoute(async () => {
    const tvId = validateMediaId(id);
    return fetchTVDetail(tvId);
  }, CACHE_HEADERS.detail);
}
