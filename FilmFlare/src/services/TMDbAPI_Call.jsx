const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // ✅ Loaded securely from .env or Vercel
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch Trending Movies
export const fetchTrendingMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchBollywoodMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchHollywoodMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&region=US&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

// Search Movies
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
