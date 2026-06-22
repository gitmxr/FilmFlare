import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasTmdbKey = Boolean(process.env.TMDB_API_KEY);
  const hasYoutubeKey = Boolean(process.env.YOUTUBE_API_KEY);

  const healthy = hasTmdbKey && hasYoutubeKey;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 }
  );
}
