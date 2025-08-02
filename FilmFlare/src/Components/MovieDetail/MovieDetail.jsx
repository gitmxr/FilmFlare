import { Link, useLoaderData } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { movie, trailer, similarMovies } = useLoaderData();

  return (
    <div className="bg-black min-h-screen text-white p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 mb-4 sm:mb-6 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-200"
        >
          ← Back to Home
        </Link>

        {/* Movie Detail Section */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          <div className="w-full md:w-1/3">
            <div className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src={
                  movie.poster_path
                    ? `${posterBaseUrl}${movie.poster_path}`
                    : "https://via.placeholder.com/300"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-300 mb-2 text-sm sm:text-base">
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="text-gray-300 mb-2 text-sm sm:text-base">
              <span className="font-semibold">Rating:</span> ⭐{" "}
              {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Genres: {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Runtime: {movie.runtime} min
            </p>
            <p className="text-gray-200 mt-4 text-sm sm:text-base">
              {movie.overview}
            </p>

            {trailer ? (
              <div className="mt-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  Watch Trailer
                </h2>
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 mt-6">Trailer not available.</p>
            )}
          </div>
        </div>

        {similarMovies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Similar Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similarMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  posterBaseUrl={posterBaseUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;

export const movieDetailLoader = async ({ params }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const { id } = params;

  try {
    const [movieRes, videoRes, similarRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`
      ),
    ]);

    if (!movieRes.ok) throw new Error("Movie not found.");

    const movie = await movieRes.json();
    const videos = await videoRes.json();
    const similar = await similarRes.json();

    const trailer = videos.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return { movie, trailer, similarMovies: similar.results };
  } catch (error) {
    console.error("Movie Detail Loader Error:", error);
    throw error; // Will be caught by Router error handling
  }
};
