import React, { useState, useEffect } from "react";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
} from "../../../services/TMDbAPI_Call";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
    fetchTopRatedMovies().then(setTopRatedMovies);
  }, []);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-black text-white p-4 text-center">
      {/* Search Input Box */}
      <div className="sticky top-0 bg-black z-10 p-4">
        <div className="flex justify-center">
          <div className="flex bg-white text-black p-1 rounded-3xl shadow-lg w-[600px]">
            <input
              type="text"
              placeholder="Search for movies..."
              className="p-2 rounded-l-3xl border-none outline-none w-full"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-r-3xl">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending Movies Title */}
      <div className="text-left w-full mt-8 mb-4">
        <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
          Trending Movies
        </h2>
      </div>

      {/* Trending Movie Cards */}
      <div className="mt-4 flex justify-center items-center flex-wrap">
        {trendingMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md m-2 text-white w-48"
          >
            <img
              src={
                movie.poster_path
                  ? `${posterBaseUrl}${movie.poster_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <h2 className="text-lg font-bold mt-2 text-center">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Top Rated Movies Title */}
      <div className="text-left w-full mt-8 mb-4">
        <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
          Top Rated Movies
        </h2>
      </div>

      {/* Top Rated Movie Cards */}
      <div className="mt-4 flex justify-center items-center flex-wrap">
        {topRatedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md m-2 text-white w-48"
          >
            <img
              src={
                movie.poster_path
                  ? `${posterBaseUrl}${movie.poster_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <h2 className="text-lg font-bold mt-2 text-center">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
