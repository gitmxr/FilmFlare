import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MusicDetailView from "@/components/music/MusicDetailView";
import { ApiError } from "@/lib/api/errors";
import { fetchMusicDetail } from "@/lib/api/youtube";

export const revalidate = 86400;

interface MusicDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: MusicDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await fetchMusicDetail(id);
    return {
      title: data.title,
      description: `Watch ${data.title} by ${data.channelTitle}`,
      openGraph: {
        title: data.title,
        description: `Watch ${data.title} by ${data.channelTitle}`,
      },
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Music Not Found" };
    }
    return { title: "Music" };
  }
}

export default async function MusicDetailPage({
  params,
  searchParams,
}: MusicDetailPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const pageTokenRaw = query.pageToken;
  const pageToken = Array.isArray(pageTokenRaw)
    ? pageTokenRaw[0] ?? ""
    : pageTokenRaw ?? "";

  try {
    const data = await fetchMusicDetail(id, pageToken);
    return <MusicDetailView data={data} videoId={data.videoId} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
