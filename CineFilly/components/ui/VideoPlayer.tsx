"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-video w-full items-center justify-center bg-gray-900 text-gray-400">
      Loading player...
    </div>
  ),
});

interface VideoPlayerProps {
  videoId: string;
  title: string;
  storageKey: string;
}

function readProgress(key: string): number {
  if (typeof window === "undefined") return 0;
  const value = window.localStorage.getItem(key);
  const parsed = value ? Number(value) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function VideoPlayer({
  videoId,
  title,
  storageKey,
}: VideoPlayerProps) {
  const progressKey = `cinefilly-watch-progress:${storageKey}`;
  const startAt = readProgress(progressKey);
  const playerRef = useRef<HTMLVideoElement>(null);
  const hasSeeked = useRef(false);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        key={storageKey}
        ref={playerRef}
        src={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        controls
        light={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        playIcon={
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-lg">
            ▶
          </span>
        }
        onReady={() => {
          if (!hasSeeked.current && startAt > 5 && playerRef.current) {
            playerRef.current.currentTime = startAt;
            hasSeeked.current = true;
          }
        }}
        onTimeUpdate={(event) => {
          const current = event.currentTarget.currentTime;
          window.localStorage.setItem(progressKey, String(current));
        }}
      />
      <span className="sr-only">{title} trailer player</span>
    </div>
  );
}
