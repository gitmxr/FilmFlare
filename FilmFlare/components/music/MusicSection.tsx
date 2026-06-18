import MusicGrid from "./MusicGrid";
import type { YouTubeSearchItem } from "@/lib/types";

interface MusicSectionProps {
  title: string;
  songs: YouTubeSearchItem[];
}

export default function MusicSection({ title, songs }: MusicSectionProps) {
  return (
    <section className="mt-8">
      <div className="mb-4 w-full text-left">
        <h2 className="border-l-4 border-red-600 pl-4 text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      <MusicGrid songs={songs} />
    </section>
  );
}
