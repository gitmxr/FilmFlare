"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/types";
import { POSTER_BASE_URL } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
      className="w-full max-w-xs"
    >
      <Link
        href={`/movie/${movie.id}`}
        className="block h-full transition-transform"
      >
        <div className="flex h-full flex-col items-center rounded-xl bg-gray-900 p-3 text-white shadow-lg transition duration-300 hover:shadow-2xl">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="mt-3 flex w-full flex-grow flex-col justify-between text-center">
            <h2 className="line-clamp-2 min-h-[3rem] text-base font-semibold">
              {movie.title}
            </h2>
            <div className="mt-1 flex items-center justify-center gap-1 text-sm text-yellow-400">
              ⭐ {movie.vote_average?.toFixed(1)} / 10
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
