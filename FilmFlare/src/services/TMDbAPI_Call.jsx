import React from 'react';

const API_KEY = "9a70097a9e4c68411d37bbff3401e470";
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
    const response  = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
     const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};