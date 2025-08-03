import { Link, useLoaderData, useNavigate } from "react-router-dom";
import MusicCard from "../MusicCard/MusicCard";

function MusicDetail() {
  const {
    videoId,
    title,
    channelTitle,
    similarSongs,
    nextPageToken,
    prevPageToken,
  } = useLoaderData();

  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        <Link
          to="/music"
          className="inline-flex items-center gap-1 mb-4 sm:mb-6 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-200"
        >
          ← Back to Music
        </Link>

        <h1 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mb-4">By {channelTitle}</p>

        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-10">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {similarSongs.length > 0 && (
          <>
            <div className="text-left w-full mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
                🎶 Similar Songs
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similarSongs.map((song) => (
                <MusicCard key={song.id.videoId} song={song} />
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-4">
              {prevPageToken && (
                <button
                  onClick={() => navigate(`?pageToken=${prevPageToken}`)}
                  className="bg-gray-600 text-gray-300 px-4 py-1 rounded hover:bg-gray-700 transition"
                >
                  ← Previous
                </button>
              )}
              {nextPageToken && (
                <button
                  onClick={() => navigate(`?pageToken=${nextPageToken}`)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                  Next →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MusicDetail;
