import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchBollywoodMovies,
  fetchHollywoodMovies,
} from "../services/TMDbAPI_Call";

export async function homeLoader({ request }) {
  const url = new URL(request.url);
  const trendingPage = parseInt(url.searchParams.get("trendingPage") ?? "1");
  const topRatedPage = parseInt(url.searchParams.get("topRatedPage") ?? "1");
  const bollywoodPage = parseInt(url.searchParams.get("bollywoodPage") ?? "1");
  const hollywoodPage = parseInt(url.searchParams.get("hollywoodPage") ?? "1");

  const [trending, topRated, bollywood, hollywood] = await Promise.all([
    fetchTrendingMovies(trendingPage),
    fetchTopRatedMovies(topRatedPage),
    fetchBollywoodMovies(bollywoodPage),
    fetchHollywoodMovies(hollywoodPage),
  ]);

  return {
    trending,
    topRated,
    bollywood,
    hollywood,
    trendingPage,
    topRatedPage,
    bollywoodPage,
    hollywoodPage,
  };
}
