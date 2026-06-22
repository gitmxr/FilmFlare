import type { Metadata } from "next";
import MusicContent from "@/components/music/MusicContent";
import { searchYouTubeMusic } from "@/lib/api/youtube";
import type { YouTubeSearchItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Music",
  description: "Discover Indian, Pakistani, and English music videos",
  openGraph: {
    title: "Music | CineFilly",
    description: "Discover Indian, Pakistani, and English music videos",
  },
};

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
    <MusicContent
      sections={{
        indian,
        pakistani,
        english,
      }}
    />
  );
}
