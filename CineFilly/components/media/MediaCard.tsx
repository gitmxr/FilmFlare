"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import { getMediaHref, getMediaTitle, getMediaYear } from "@/lib/media-utils";
import type { Movie, TVShow, TrendingMediaItem } from "@/lib/types";
import { POSTER_BASE_URL } from "@/lib/types";

interface MediaCardProps {
  item: Movie | TVShow | TrendingMediaItem;
  mediaType?: "movie" | "tv";
}

export default function MediaCard({ item, mediaType }: MediaCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const href = getMediaHref(item, mediaType);
  const title = getMediaTitle(item);
  const year = getMediaYear(item);
  const posterUrl = item.poster_path
    ? `${POSTER_BASE_URL}${item.poster_path}`
    : null;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
      className="h-full w-full"
    >
      <Link href={href} className="block h-full w-full">
        <div className="flex h-full w-full flex-col items-center rounded-xl bg-gray-900 p-3 text-white shadow-lg transition duration-300 hover:shadow-2xl">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
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
              {title}
            </h2>
            <StarRating rating={item.vote_average ?? 0} className="mt-1" />
            <p className="mt-1 text-xs text-gray-400">{year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
