"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { YouTubeSearchItem } from "@/lib/types";

interface MusicCardProps {
  song: YouTubeSearchItem;
}

export default function MusicCard({ song }: MusicCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { videoId } = song.id;
  const { title, thumbnails, channelTitle, publishedAt } = song.snippet;
  const thumbnailUrl = thumbnails?.high?.url ?? thumbnails?.medium?.url;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
      className="w-full max-w-xs"
    >
      <Link href={`/music/${videoId}`} className="block h-full">
        <div className="flex h-full flex-col items-center rounded-xl bg-gray-900 p-3 text-white shadow-lg transition duration-300 hover:shadow-2xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
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
            <div className="mt-1 text-sm text-yellow-400">🎤 {channelTitle}</div>
            <p className="mt-1 text-xs text-gray-400">
              {publishedAt ? publishedAt.slice(0, 10) : "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
