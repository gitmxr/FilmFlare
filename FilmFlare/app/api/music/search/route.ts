import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { searchYouTubeMusic } from "@/lib/api/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? searchParams.get("query") ?? "latest hindi songs";

  return handleApiRoute(
    () => searchYouTubeMusic(query),
    CACHE_HEADERS.search
  );
}
