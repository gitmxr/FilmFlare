import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard"; 

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const [movieRes, videoRes, similarRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=9a70097a9e4c68411d37bbff3401e470&language=en-US`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9a70097a9e4c68411d37bbff3401e470&language=en-US`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=9a70097a9e4c68411d37bbff3401e470&language=en-US`
          ),
        ]);

        setMovie(movieRes.data);
        setSimilarMovies(similarRes.data.results);

        const trailerVideo = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerVideo);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-6">
        <p className="text-center text-gray-300 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-red-500 text-center mt-10">Movie not found.</div>
    );
  }

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
          {/* Poster */}
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

          {/* Movie Info */}
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

            {/* Trailer */}
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

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Similar Movies
            </h2>

            {/* Responsive Grid Same as Home Page */}
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
