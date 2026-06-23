import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";
import { validateTrendingWindow } from "@/lib/api/validation";
import { fetchTrendingAll } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePageParam(searchParams);
  const window = validateTrendingWindow(searchParams.get("window"));

  return handleApiRoute(
    () => fetchTrendingAll(window, page),
    CACHE_HEADERS.movies
  );
}
