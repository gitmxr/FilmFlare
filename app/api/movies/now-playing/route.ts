import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";
import { fetchNowPlayingMovies } from "@/lib/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePageParam(searchParams);

  return handleApiRoute(
    () => fetchNowPlayingMovies(page),
    CACHE_HEADERS.movies
  );
}
