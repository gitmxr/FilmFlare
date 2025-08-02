import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchBollywoodMovies,
  fetchHollywoodMovies,
  searchMovies,
} from "../../services/TMDbAPI_Call";
import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";

export async function homeLoader() {
  try {
    const [trending, topRated, bollywood, hollywood] = await Promise.all([
      fetchTrendingMovies(),
      fetchTopRatedMovies(),
      fetchBollywoodMovies(),
      fetchHollywoodMovies(),
    ]);

    return {
      trending,
      topRated,
      bollywood,
      hollywood,
    };
  } catch (error) {
    console.error("Loader failed:", error);
    return {
      trending: [],
      topRated: [],
      bollywood: [],
      hollywood: [],
    };
  }
}

function Home() {
  const { trending, topRated, bollywood, hollywood } = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        searchMovies(searchQuery).then(setSearchResults);
      } else {
        setSearchResults([]);
      }
    }, 500); // debounce for 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderMovieSection = (title, movies) => (
    <>
      <div className="text-left w-full mt-8 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            posterBaseUrl={posterBaseUrl}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="pt-4 sm:pt-6 px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="mb-10">
            <div className="text-left w-full mb-4">
              <div className="inline-block text-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-xl shadow-lg">
                🔍 Search Results
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  posterBaseUrl={posterBaseUrl}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Sections */}
        {renderMovieSection("Trending Movies", trending)}
        {renderMovieSection("Top Rated Movies", topRated)}
        {renderMovieSection("Bollywood Movies", bollywood)}
        {renderMovieSection("Hollywood Movies", hollywood)}
      </div>
    </div>
  );
}

export default Home;
