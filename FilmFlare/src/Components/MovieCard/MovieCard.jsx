import { Link } from "react-router-dom";

function MovieCard({ movie, posterBaseUrl }) {
  const posterUrl = movie.poster_path
    ? `${posterBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="transition-transform transform hover:scale-105 w-full max-w-xs"
    >
      <div className="bg-gray-900 rounded-xl shadow-lg p-3 text-white hover:shadow-2xl transition duration-300 flex flex-col items-center h-full">
        {/* Poster Image */}
        <div className="w-full aspect-[2/3] rounded-lg overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="mt-3 text-center w-full flex flex-col justify-between flex-grow">
          <h2 className="text-base font-semibold line-clamp-2 min-h-[3rem]">
            {movie.title}
          </h2>

          <div className="mt-1 text-sm text-yellow-400 flex items-center justify-center gap-1">
            ⭐ {movie.vote_average?.toFixed(1)} / 10
          </div>

          <p className="text-xs text-gray-400 mt-1">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
