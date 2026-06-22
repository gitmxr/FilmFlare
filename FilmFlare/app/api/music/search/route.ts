import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { validateSearchQuery } from "@/lib/api/validation";
import { searchYouTubeMusic } from "@/lib/api/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? searchParams.get("query") ?? "";

  return handleApiRoute(async () => {
    const normalizedQuery = validateSearchQuery(query);
    return searchYouTubeMusic(normalizedQuery);
  }, CACHE_HEADERS.search);
}
