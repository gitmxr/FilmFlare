import type { MetadataRoute } from "next";
import {
  fetchTrendingMovies,
  fetchTrendingTV,
} from "@/lib/api/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cine-filly.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/movies`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/explore/tv`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/music`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const [trendingMovies, trendingTV] = await Promise.all([
      fetchTrendingMovies(1),
      fetchTrendingTV(1),
    ]);

    const movieRoutes: MetadataRoute.Sitemap = trendingMovies
      .slice(0, 50)
      .map((movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    const tvRoutes: MetadataRoute.Sitemap = trendingTV.slice(0, 50).map((show) => ({
      url: `${baseUrl}/tv/${show.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...movieRoutes, ...tvRoutes];
  } catch {
    return staticRoutes;
  }
}
