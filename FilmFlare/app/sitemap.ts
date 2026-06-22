import type { MetadataRoute } from "next";
import { fetchTrendingMovies } from "@/lib/api/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://film-flare.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "hourly", priority: 1 },
    { url: `${baseUrl}/music`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const trending = await fetchTrendingMovies(1);
    const movieRoutes: MetadataRoute.Sitemap = trending.slice(0, 50).map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...movieRoutes];
  } catch {
    return staticRoutes;
  }
}
