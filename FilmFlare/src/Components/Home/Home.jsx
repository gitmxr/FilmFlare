import React, { useState, useEffect } from "react";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchBollywoodMovies,
  fetchHollywoodMovies,
  searchMovies,
} from "../../services/TMDbAPI_Call";
import Header from "../Header/Header"; // Import Header here directly
import MovieCard from "../MovieCard/MovieCard";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
    fetchTopRatedMovies().then(setTopRatedMovies);
    fetchBollywoodMovies().then(setBollywoodMovies);
    fetchHollywoodMovies().then(setHollywoodMovies);
  }, []);

  useEffect(() => {
    const handleSearchTrigger = () => {
      if (searchQuery.trim() === "") return;
      searchMovies(searchQuery).then(setSearchResults);
    };

    window.addEventListener("searchTriggered", handleSearchTrigger);
    return () => {
      window.removeEventListener("searchTriggered", handleSearchTrigger);
    };
  }, [searchQuery]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="text-center pt-6 px-4">
        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <div className="text-left w-full mb-4">
              <div className="inline-block text-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-xl shadow-lg">
                🔍 Search Results
              </div>
            </div>

            <div className="flex justify-center items-center flex-wrap">
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

        {/* Trending Movies Section */}
        <div className="text-left w-full mt-8 mb-4">
          <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
            Trending Movies
          </h2>
        </div>

        <div className="mt-4 flex justify-center items-center flex-wrap">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              posterBaseUrl={posterBaseUrl}
            />
          ))}
        </div>

        {/* Top Rated Movies Section */}
        <div className="text-left w-full mt-8 mb-4">
          <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
            Top Rated Movies
          </h2>
        </div>

        <div className="mt-4 flex justify-center items-center flex-wrap">
          {topRatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              posterBaseUrl={posterBaseUrl}
            />
          ))}
        </div>

        {/* Bollywood Movies Section */}
        <div className="text-left w-full mt-8 mb-4">
          <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
            Bollywood Movies
          </h2>
        </div>

        <div className="mt-4 flex justify-center items-center flex-wrap">
          {bollywoodMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              posterBaseUrl={posterBaseUrl}
            />
          ))}
        </div>

        {/* Hollywood Movies Section */}
        <div className="text-left w-full mt-8 mb-4">
          <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
            Hollywood Movies
          </h2>
        </div>

        <div className="mt-4 flex justify-center items-center flex-wrap">
          {hollywoodMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              posterBaseUrl={posterBaseUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
