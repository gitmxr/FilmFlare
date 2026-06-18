import { CACHE_HEADERS } from "@/lib/api/cache";
import { ApiError } from "@/lib/api/errors";
import { handleApiRoute } from "@/lib/api/route-utils";
import { searchMovies } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? searchParams.get("query") ?? "";

  return handleApiRoute(async () => {
    if (!query.trim()) {
      throw new ApiError("Search query is required", 400);
    }
    return searchMovies(query);
  }, CACHE_HEADERS.search);
}
