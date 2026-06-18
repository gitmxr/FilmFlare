import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MovieGrid from "@/components/movies/MovieGrid";
import type { MovieDetailData } from "@/lib/types";
import { POSTER_BASE_URL } from "@/lib/types";

interface MovieDetailViewProps {
  data: MovieDetailData;
}

export default function MovieDetailView({ data }: MovieDetailViewProps) {
  const { movie, trailer, similarMovies } = data;
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-black p-4 text-white sm:p-6">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Movies", href: "/" },
            { label: movie.title },
          ]}
        />
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm transition duration-200 hover:bg-red-700 sm:mb-6"
        >
          ← Back to Home
        </Link>

        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="mb-4 text-2xl font-bold text-yellow-400 sm:text-3xl">
              {movie.title}
            </h1>
            <p className="mb-2 text-sm text-gray-300 sm:text-base">
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="mb-2 text-sm text-gray-300 sm:text-base">
              <span className="font-semibold">Rating:</span> ⭐{" "}
              {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} votes)
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Genres: {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Runtime: {movie.runtime} min
            </p>
            <p className="mt-4 text-sm text-gray-200 sm:text-base">
              {movie.overview}
            </p>

            {trailer ? (
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl">
                  Watch Trailer
                </h2>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            ) : (
              <p className="mt-6 text-gray-400">Trailer not available.</p>
            )}
          </div>
        </div>

        {similarMovies.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold text-white sm:text-3xl">
              Similar Movies
            </h2>
            <MovieGrid movies={similarMovies} />
          </section>
        )}
      </div>
    </div>
  );
}
