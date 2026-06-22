import { ApiError } from "@/lib/api/errors";

export const MAX_PAGE = 500;
export const MAX_SEARCH_LENGTH = 200;
export const MAX_PAGE_TOKEN_LENGTH = 100;

const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const MOVIE_ID_PATTERN = /^\d+$/;

export function parsePageNumber(
  value: string | null | undefined,
  fallback = 1
): number {
  const page = parseInt(value ?? String(fallback), 10);
  if (Number.isNaN(page) || page < 1) return fallback;
  return Math.min(page, MAX_PAGE);
}

export function validateMovieId(id: string): string {
  const trimmed = id.trim();
  if (!MOVIE_ID_PATTERN.test(trimmed)) {
    throw new ApiError("Invalid movie ID", 400);
  }
  return trimmed;
}

export function validateYouTubeVideoId(id: string): string {
  const trimmed = id.trim();
  if (!YOUTUBE_VIDEO_ID_PATTERN.test(trimmed)) {
    throw new ApiError("Invalid video ID", 400);
  }
  return trimmed;
}

export function validatePageToken(token: string): string {
  const trimmed = token.trim();
  if (!trimmed) return "";
  if (trimmed.length > MAX_PAGE_TOKEN_LENGTH) {
    throw new ApiError("Invalid page token", 400);
  }
  return trimmed;
}

export function validateSearchQuery(
  query: string,
  { required = true }: { required?: boolean } = {}
): string {
  const trimmed = query.trim();

  if (!trimmed) {
    if (required) {
      throw new ApiError("Search query is required", 400);
    }
    return "";
  }

  if (trimmed.length > MAX_SEARCH_LENGTH) {
    throw new ApiError(
      `Search query must be ${MAX_SEARCH_LENGTH} characters or fewer`,
      400
    );
  }

  return trimmed;
}

export function validateYouTubeEmbedId(id: string): string | null {
  return YOUTUBE_VIDEO_ID_PATTERN.test(id) ? id : null;
}
