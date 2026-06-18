import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MusicGrid from "@/components/music/MusicGrid";
import type { MusicDetailData } from "@/lib/types";

interface MusicDetailViewProps {
  data: MusicDetailData;
  videoId: string;
}

export default function MusicDetailView({ data, videoId }: MusicDetailViewProps) {
  const { title, channelTitle, similarSongs, nextPageToken, prevPageToken } =
    data;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Music", href: "/music" },
            { label: title },
          ]}
        />
        <Link
          href="/music"
          className="mb-4 inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm transition duration-200 hover:bg-red-700 sm:mb-6"
        >
          ← Back to Music
        </Link>

        <h1 className="mb-2 text-xl font-bold text-yellow-400 sm:text-2xl">
          {title}
        </h1>
        <p className="mb-4 text-sm text-gray-400">By {channelTitle}</p>

        <div className="mb-10 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        {similarSongs.length > 0 && (
          <>
            <div className="mb-4 w-full text-left">
              <h2 className="border-l-4 border-red-600 pl-4 text-2xl font-bold text-white sm:text-3xl">
                🎶 Similar Songs
              </h2>
            </div>

            <MusicGrid songs={similarSongs} />

            <div className="mt-6 flex justify-center gap-4">
              {prevPageToken && (
                <Link
                  href={`/music/${videoId}?pageToken=${encodeURIComponent(prevPageToken)}`}
                  className="rounded bg-gray-600 px-4 py-1 text-gray-300 transition hover:bg-gray-700"
                >
                  ← Previous
                </Link>
              )}
              {nextPageToken && (
                <Link
                  href={`/music/${videoId}?pageToken=${encodeURIComponent(nextPageToken)}`}
                  className="rounded bg-red-600 px-4 py-1 text-white transition hover:bg-red-700"
                >
                  Next →
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
