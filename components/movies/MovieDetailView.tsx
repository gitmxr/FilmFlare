import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CastGrid from "@/components/media/CastGrid";
import MediaCarouselSection from "@/components/media/MediaCarouselSection";
import VideoPlayer from "@/components/ui/VideoPlayer";
import StarRating from "@/components/ui/StarRating";
import { validateYouTubeEmbedId } from "@/lib/api/validation";
import type { MovieDetailData } from "@/lib/types";
import { BACKDROP_BASE_URL, POSTER_BASE_URL } from "@/lib/types";

interface MovieDetailViewProps {
  data: MovieDetailData;
}

export default function MovieDetailView({ data }: MovieDetailViewProps) {
  const { movie, trailer, similarMovies, cast, director, writer } = data;
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : null;
  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;
  const trailerKey = trailer ? validateYouTubeEmbedId(trailer.key) : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {backdropUrl && (
        <div className="relative h-48 w-full sm:h-64 md:h-80">
          <Image
            src={backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Movies", href: "/movies" },
            { label: movie.title },
          ]}
        />
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm transition duration-200 hover:bg-red-700 sm:mb-6"
        >
          ← Back to Home
        </Link>

        <div className="-mt-10 flex flex-col gap-6 sm:-mt-16 sm:gap-8 md:flex-row">
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
            <h1 className="text-2xl font-bold text-yellow-400 sm:text-3xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-2 text-sm italic text-gray-400">{movie.tagline}</p>
            )}

            <p className="mb-2 mt-4 text-sm text-gray-300 sm:text-base">
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-300 sm:text-base">
              <span className="font-semibold">Rating:</span>
              <StarRating rating={movie.vote_average} size="md" />
              <span className="text-gray-400">({movie.vote_count} votes)</span>
            </p>
            {movie.status && (
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Status:</span> {movie.status}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-300">
              Genres: {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Runtime: {movie.runtime ? `${movie.runtime} min` : "N/A"}
            </p>
            {director && (
              <p className="mt-2 text-sm text-gray-300">
                <span className="font-semibold">Director:</span>{" "}
                <Link href={`/person/${director.id}`} className="text-red-400 hover:underline">
                  {director.name}
                </Link>
              </p>
            )}
            {writer && (
              <p className="mt-1 text-sm text-gray-300">
                <span className="font-semibold">Writer:</span>{" "}
                <Link href={`/person/${writer.id}`} className="text-red-400 hover:underline">
                  {writer.name}
                </Link>
              </p>
            )}
            <p className="mt-4 text-sm text-gray-200 sm:text-base">
              {movie.overview}
            </p>

            {trailerKey ? (
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold sm:text-xl">
                  Watch Trailer
                </h2>
                <VideoPlayer
                  videoId={trailerKey}
                  title={movie.title}
                  storageKey={`movie-${movie.id}-${trailerKey}`}
                />
              </div>
            ) : (
              <p className="mt-6 text-gray-400">Trailer not available.</p>
            )}
          </div>
        </div>

        <CastGrid cast={cast} />

        {similarMovies.length > 0 && (
          <div className="mt-10">
            <MediaCarouselSection
              title="Similar Movies"
              items={similarMovies}
              mediaType="movie"
            />
          </div>
        )}
      </div>
    </div>
  );
}
