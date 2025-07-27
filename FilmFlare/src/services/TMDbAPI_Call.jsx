import React from "react";

const API_KEY = "9a70097a9e4c68411d37bbff3401e470";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Bollywood (Indian) Movies
export const fetchBollywoodMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=9a70097a9e4c68411d37bbff3401e470&with_original_language=hi&sort_by=popularity.desc`
  );
  const data = await response.json();
  return data.results;
};

// Hollywood (US) Movies
export const fetchHollywoodMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=9a70097a9e4c68411d37bbff3401e470&with_original_language=en&region=US&sort_by=popularity.desc`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const apiKey = "9a70097a9e4c68411d37bbff3401e470"; // Your TMDb API key
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
