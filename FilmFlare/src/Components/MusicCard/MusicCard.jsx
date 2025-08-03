import { Link } from "react-router-dom";

function MusicCard({ song }) {
  const { videoId } = song.id;
  const { title, thumbnails, channelTitle, publishedAt } = song.snippet;

  const thumbnailUrl =
    thumbnails?.high?.url || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Link
      to={`/music/${videoId}`}     // ✅ Link to Music Detail Page
      className="transition-transform transform hover:scale-105 w-full max-w-xs"
    >
      <div className="bg-gray-900 rounded-xl shadow-lg p-3 text-white hover:shadow-2xl transition duration-300 flex flex-col items-center h-full">
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 text-center w-full flex flex-col justify-between flex-grow">
          <h2 className="text-base font-semibold line-clamp-2 min-h-[3rem]">
            {title}
          </h2>

          <div className="mt-1 text-sm text-yellow-400">
            🎤 {channelTitle}
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {publishedAt ? publishedAt.slice(0, 10) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MusicCard;
