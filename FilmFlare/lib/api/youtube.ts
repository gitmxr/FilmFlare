import type { MusicDetailData, YouTubeSearchItem, YouTubeVideoItem } from "@/lib/types";
import { REVALIDATE } from "./cache";
import { ApiError } from "./errors";
import {
  validatePageToken,
  validateSearchQuery,
  validateYouTubeVideoId,
} from "./validation";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

function getApiKey(): string {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new ApiError("Service configuration error", 500);
  }
  return apiKey;
}

async function youtubeFetch<T>(
  path: string,
  revalidate: number = REVALIDATE.music
): Promise<T> {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${separator}key=${getApiKey()}`;

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new ApiError("YouTube API request failed", response.status);
  }

  return response.json() as Promise<T>;
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
  nextPageToken?: string;
  prevPageToken?: string;
}

interface YouTubeVideosResponse {
  items: YouTubeVideoItem[];
}

export async function searchYouTubeMusic(query: string): Promise<YouTubeSearchItem[]> {
  const normalizedQuery = validateSearchQuery(query);

  const data = await youtubeFetch<YouTubeSearchResponse>(
    `/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(normalizedQuery)}`,
    REVALIDATE.musicSearch
  );
  return data.items ?? [];
}

export async function fetchMusicDetail(
  id: string,
  pageToken = ""
): Promise<MusicDetailData> {
  const videoId = validateYouTubeVideoId(id);
  const token = validatePageToken(pageToken);

  const detailData = await youtubeFetch<YouTubeVideosResponse>(
    `/videos?part=snippet&id=${videoId}`,
    REVALIDATE.detail
  );
  const video = detailData.items?.[0];

  if (!video) {
    throw new ApiError("Video not found", 404);
  }

  const searchParams = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: "8",
    q: video.snippet.title,
  });

  if (token) {
    searchParams.set("pageToken", token);
  }

  const searchData = await youtubeFetch<YouTubeSearchResponse>(
    `/search?${searchParams.toString()}`,
    REVALIDATE.musicSearch
  );

  return {
    videoId,
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    similarSongs: (searchData.items ?? []).filter((item) => item.id.videoId !== videoId),
    nextPageToken: searchData.nextPageToken,
    prevPageToken: searchData.prevPageToken,
  };
}
