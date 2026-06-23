import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";
import { fetchTopRatedTV, fetchTrendingTV } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePageParam(searchParams);
  const list = searchParams.get("list");

  return handleApiRoute(async () => {
    if (list === "top-rated") {
      return fetchTopRatedTV(page);
    }
    return fetchTrendingTV(page);
  }, CACHE_HEADERS.movies);
}
