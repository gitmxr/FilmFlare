export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
}

export interface YouTubeSnippet {
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnails;
  description?: string;
}

export interface YouTubeVideoId {
  videoId: string;
}

export interface YouTubeSearchItem {
  id: YouTubeVideoId;
  snippet: YouTubeSnippet;
}

export interface YouTubeVideoItem {
  id: string;
  snippet: YouTubeSnippet;
}

export interface MusicDetailData {
  videoId: string;
  title: string;
  channelTitle: string;
  similarSongs: YouTubeSearchItem[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export type MusicSectionKey = "indian" | "pakistani" | "english";
