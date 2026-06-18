import { CACHE_HEADERS } from "@/lib/api/cache";
import { handleApiRoute } from "@/lib/api/route-utils";
import { fetchMusicDetail } from "@/lib/api/youtube";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get("pageToken") ?? "";

  return handleApiRoute(
    () => fetchMusicDetail(id, pageToken),
    CACHE_HEADERS.detail
  );
}
