import type { Metadata } from "next";
import MusicContent from "@/components/music/MusicContent";
import { searchYouTubeMusic } from "@/lib/api/youtube";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { YouTubeSearchItem } from "@/lib/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Music",
  description:
    "Discover Indian, Pakistani, and English music videos and soundtracks on CineFilly.",
  path: "/music",
  keywords: [
    "music videos",
    "indian songs",
    "pakistani songs",
    "english pop",
    "soundtracks",
    "CineFilly",
  ],
});

export const revalidate = 1800;

async function fetchSection(query: string): Promise<YouTubeSearchItem[]> {
  try {
    return await searchYouTubeMusic(query);
  } catch {
    return [];
  }
}

export default async function MusicPage() {
  const [indian, pakistani, english] = await Promise.all([
    fetchSection("Latest Indian songs"),
    fetchSection("Pakistani songs"),
    fetchSection("English pop songs"),
  ]);

  return (
    <>
      <h1 className="sr-only">Music — Indian, Pakistani &amp; English Videos</h1>
      <MusicContent
        sections={{
          indian,
          pakistani,
          english,
        }}
      />
    </>
  );
}
