import type { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { searchYouTubeMusic } from "@/lib/api/youtube";

const MusicContent = dynamic(() => import("@/components/music/MusicContent"), {
  loading: () => <LoadingSpinner label="Loading music..." />,
});

export const metadata: Metadata = {
  title: "Music",
  description: "Discover Indian, Pakistani, and English music videos",
};

export const revalidate = 1800;

export default async function MusicPage() {
  const [indian, pakistani, english] = await Promise.all([
    searchYouTubeMusic("Latest Indian songs"),
    searchYouTubeMusic("Pakistani songs"),
    searchYouTubeMusic("English pop songs"),
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
