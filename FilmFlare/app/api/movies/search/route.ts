import { CACHE_HEADERS } from "@/lib/api/cache";
import { ApiError } from "@/lib/api/errors";
import { handleApiRoute } from "@/lib/api/route-utils";
import { validateSearchQuery } from "@/lib/api/validation";
import { searchMovies } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? searchParams.get("query") ?? "";

  return handleApiRoute(async () => {
    const normalizedQuery = validateSearchQuery(query);
    return searchMovies(normalizedQuery);
  }, CACHE_HEADERS.search);
}
