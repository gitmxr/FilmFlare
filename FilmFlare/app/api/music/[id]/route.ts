import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { fetchMusicDetail } from "@/lib/api/youtube";
import { validatePageToken, validateYouTubeVideoId } from "@/lib/api/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const pageToken = validatePageToken(searchParams.get("pageToken") ?? "");

  return handleApiRoute(
    () => fetchMusicDetail(validateYouTubeVideoId(id), pageToken),
    CACHE_HEADERS.detail
  );
}
