import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MusicDetailView from "@/components/music/MusicDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { ApiError } from "@/lib/api/errors";
import { fetchMusicDetail } from "@/lib/api/youtube";
import {
  absoluteUrl,
  buildPageMetadata,
  youtubeThumbnailUrl,
} from "@/lib/seo/metadata";

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
    const thumbnail = youtubeThumbnailUrl(id);

    return buildPageMetadata({
      title: data.title,
      description: `Watch ${data.title} by ${data.channelTitle} on CineFilly.`,
      path: `/music/${id}`,
      images: [thumbnail],
      type: "video.other",
      keywords: ["music", data.channelTitle, data.title, "CineFilly"],
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return buildPageMetadata({
        title: "Music Not Found",
        noIndex: true,
      });
    }
    return buildPageMetadata({ title: "Music" });
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

  let data;

  try {
    data = await fetchMusicDetail(id, pageToken);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicVideoObject",
    name: data.title,
    description: `Music video by ${data.channelTitle}`,
    thumbnailUrl: youtubeThumbnailUrl(data.videoId),
    url: absoluteUrl(`/music/${data.videoId}`),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <MusicDetailView data={data} videoId={data.videoId} />
    </>
  );
}
