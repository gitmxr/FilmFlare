import type { Metadata } from "next";

/** Canonical site URL — always defined so metadataBase and canonicals resolve in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cine-filly.vercel.app";

export const SITE_NAME = "CineFilly";

export const DEFAULT_DESCRIPTION =
  "Discover movies, TV shows, web series, music, trailers, and cast profiles on CineFilly.";

export const DEFAULT_KEYWORDS = [
  "movies",
  "tv shows",
  "web series",
  "music videos",
  "movie trailers",
  "bollywood",
  "hollywood",
  "TMDB",
  "streaming",
  "CineFilly",
];

export const DEFAULT_OG_IMAGE_PATH = "/images/cinefilly_logo.webp";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateDescription(
  text: string | undefined | null,
  max = 160,
  fallback = DEFAULT_DESCRIPTION
): string {
  const cleaned = (text ?? "").trim();
  if (!cleaned) return fallback;
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  images?: Array<string | { url: string; alt?: string }>;
  type?: "website" | "article" | "video.other";
}

/** Builds consistent page metadata with OG, Twitter, canonical, and keywords. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  images,
  type = "website",
}: PageMetadataOptions): Metadata {
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const ogImages =
    images && images.length > 0
      ? images.map((image) =>
          typeof image === "string"
            ? { url: image, alt: title }
            : { url: image.url, alt: image.alt ?? title }
        )
      : [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME }];

  const imageUrls = ogImages.map((image) => image.url);

  return {
    title,
    description: resolvedDescription,
    keywords,
    alternates: path ? { canonical: absoluteUrl(path) } : undefined,
    openGraph: {
      title,
      description: resolvedDescription,
      url: path ? absoluteUrl(path) : SITE_URL,
      siteName: SITE_NAME,
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: imageUrls,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
