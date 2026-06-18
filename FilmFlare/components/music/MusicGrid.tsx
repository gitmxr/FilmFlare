import type { YouTubeSearchItem } from "@/lib/types";
import MusicCard from "./MusicCard";

interface MusicGridProps {
  songs: YouTubeSearchItem[];
}

export default function MusicGrid({ songs }: MusicGridProps) {
  if (songs.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">No songs found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {songs.map((song) => (
        <MusicCard key={song.id.videoId} song={song} />
      ))}
    </div>
  );
}
