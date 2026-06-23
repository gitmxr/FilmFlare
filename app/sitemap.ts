import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { fetchTrendingMovies, fetchTrendingTV } from "@/lib/api/tmdb";

/** Regenerate sitemap hourly alongside trending data TTL. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "hourly", priority: 1 },
    {
      url: `${SITE_URL}/movies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tv`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/music`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const [trendingMovies, trendingTV] = await Promise.all([
      fetchTrendingMovies(1),
      fetchTrendingTV(1),
    ]);

    const movieRoutes: MetadataRoute.Sitemap = trendingMovies
      .slice(0, 24)
      .map((movie) => ({
        url: `${SITE_URL}/movie/${movie.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    const tvRoutes: MetadataRoute.Sitemap = trendingTV.slice(0, 24).map((show) => ({
      url: `${SITE_URL}/tv/${show.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...movieRoutes, ...tvRoutes];
  } catch {
    return staticRoutes;
  }
}
